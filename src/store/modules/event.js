import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
  perPage: 3,
};

export const getters = {
  getEventById(state) {
    return function(id) {
      return state.events.find(event => event.id === id);
    };
  },
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + err.message,
        };
        dispatch('notification/add', notification, { root: true });
        throw err;
      });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event;
    } else {
      return EventService.getEvent(id).then(res => {
        commit('SET_EVENT', res.data);
        return res.data;
      });
    }
  },
  fetchEvents({ state, commit, dispatch }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(res => {
        commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']));
        commit('SET_EVENTS', res.data);
        return res.data;
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + err.message,
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
};

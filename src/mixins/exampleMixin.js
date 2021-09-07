export const exampleMixin = {
  data() {
    return {
      message: 'I am such a nice mixin',
      foo: 'bar',
    };
  },

  created() {
    this.logMessage();
  },

  methods: {
    logMessage() {
      console.log(this.message, '👀');
    },
  },
};

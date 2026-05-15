ICAC.AuthSystem = {
  user: null,
  init: function() { this.user = { uid: 'local_' + Math.random().toString(36).substr(2, 9) }; },
  uid: function() { return this.user ? this.user.uid : 'anon'; }
};

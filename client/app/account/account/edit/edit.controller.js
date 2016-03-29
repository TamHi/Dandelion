'use strict';

class EditController {
  constructor(Auth) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.user = {
      name: Auth.getCurrentUser().name,
      email: Auth.getCurrentUser().email
    };
    this.changePwd = false;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('dandelionApp')
  .controller('EditController', EditController);

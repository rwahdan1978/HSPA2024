/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import {environment} from 'src/environments/environment.development'
<<<<<<< HEAD
import { AuthService } from 'src/app/services/auth.service';
=======
import { AuthService } from 'src/app/services/authService';
>>>>>>> a707ea6d1607b30b310e1a5d3ffac681ee5c66be

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  deviveInfo: DeviceInfo;
  registerationForm: FormGroup;
  countrycode: string = "971";
  user: UserForRegister;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService,
            private alertify: AlertifyService, private DDS: DeviceDetectorService) { }

  ngOnInit() {

    window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
      const portrait: boolean = e.matches; 
      if (portrait) { 
        location.reload(); 
      } else { 
        location.reload(); 
      } 
    });
    
    this.deviveInfo = this.DDS.getDeviceInfo();
    this.registerationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      countrycode: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      adminPass: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{9}$"),
      
        
    ]),
      
    }, {validators : this.passwordMatchingValidator})

    this.registerationForm.controls['countrycode'].setValue("+971");

  }
  
    passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null{
  
      const password = fc.get('password');
      const confirmPassword = fc.get('confirmPassword');
      
      if (password && confirmPassword && password?.value != confirmPassword?.value){
        return{
                passwordMatchError : true 
        }
      }
      return null;
    }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }
  get adminPass() {
    return this.registerationForm.get('adminPass') as FormControl;
  }

  onSubmit() {

    this.userSubmitted = true;
    
    if (this.registerationForm.valid)
    {
<<<<<<< HEAD
      if (this.adminPass.value === environment.adminPass)
      {
        this.authService.registerUser(this.userData()).subscribe(() => {
        this.registerationForm.reset();
        this.userSubmitted = false;
        this.alertify.success('You have registered successfully!');
        });    
=======
      if (this.adminPass.value === environment.adminPass){
        this.authService.registerUser(this.userData()).subscribe(() =>{
        this.registerationForm.reset();
        this.userSubmitted = false;
        this.alertify.success('You have registered successfully!');
        });
>>>>>>> a707ea6d1607b30b310e1a5d3ffac681ee5c66be
      }
      else{
        this.alertify.error('You need to be an admin! Enter the correct admin password!');
      }
    }
  }

  userData(): UserForRegister{
    return this.user = {
      userName: this.userName.value,
      countrycode: this.countrycode.toString(),
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
      
    }
  }
}
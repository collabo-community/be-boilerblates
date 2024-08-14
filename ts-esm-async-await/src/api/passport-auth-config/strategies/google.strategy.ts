import {Profile, Strategy} from 'passport-google-oauth20';
import { UserModel as User } from '../../models/user.model';
// import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';
import { badRequestErr } from '../../../lib/errors/Errors';

import dotenv from 'dotenv';
import { success } from '../../../lib/helpers';
dotenv.config();

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:8080/user/auth/google/callback",
    scope: ['email']
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback)=>{
    try {
      // console.log(profile);
      success(profile.emails[0].value);
      success(`ACCESS_TOKEN: ${accessToken}`);
      success(`REFRESH_TOKEN: ${refreshToken}`);

      // check if email is part of the returned properties of the google user profile
      const user_email = profile.emails[0].value
      if (!user_email) {
        badRequestErr("Email not Found in Google User Profile");
      }
      let user = await User.findOne({ email: user_email }).exec();
      if (user) {
        if (!user.email_verified) {
          user.email_verified = true;
          user = await user.save()
        }
      } 
      else {
        const createUser = new User({
          email: user_email,
          email_verified: true,
          password: 12345,
        });
        user = await createUser.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
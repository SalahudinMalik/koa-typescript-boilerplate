import passport from "koa-passport";
import passportJwt from "passport-jwt";
import accountAuth from "./account";
import config from "../../config";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts: passportJwt.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter("token"), ExtractJwt.fromBodyField("token"),
  ]),
  secretOrKey: config.AUTH_SECRET,
};

passport.use("account-auth", new JwtStrategy(opts, accountAuth));

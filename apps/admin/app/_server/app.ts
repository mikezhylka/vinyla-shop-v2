import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

/* 
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: 'rERVFFgz7XtShex1qGsanp5TWlZZGvn3',
  kottsterApiToken: 'nrjdKuGJ4h2jFEaPAT0K1vAopfOtpP2R',

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt: 'JJHiXRBnpkTuBu4j',
    
    /* The root admin user credentials */
    rootUsername: 'admin',
    rootPassword: '3io4fk3klfm4l3_pKLG23mklg_',
  }),
});
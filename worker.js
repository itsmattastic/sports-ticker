/**
 * sports-ticker Worker — serves the static site.
 * (Data now comes straight from TheSportsDB, which is CORS-enabled, so no
 *  server-side proxy is needed. This worker just serves the static assets.)
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};

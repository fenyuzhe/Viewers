import cache from './cache';
// Commented out unused functionality.
// Need to implement new mechanism for derived displaySets using the displaySetManager.
const { session, local } = cache;
const caches = {
  session,
  local,
};

export default caches;

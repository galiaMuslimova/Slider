function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('@d', true, /\.js$/));
requireAll(require.context('@d', true, /\.scss$/));
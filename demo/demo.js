function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('@d', true, /\.scss$/));
requireAll(require.context('@d', true, /\.js$/));
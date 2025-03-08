export default function access(initialState: { user?: any }) {
  const admin = !!(
    initialState && initialState.user == 'admin'
  );

  return {
    admin
  };
};

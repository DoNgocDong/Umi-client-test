export default function access(initialState: { token?: string }) {
  const admin = !!(
    initialState && initialState.token == 'admin'
  );

  return {
    admin
  };
};

export const isTabLeader = (tabId: string): boolean => {
  const leaderData = JSON.parse(
    localStorage.getItem("leader") || '{"id": 0, "time": 0}',
  );
  if (leaderData && leaderData.id === tabId) {
    return true;
  } else {
    return false;
  }
};

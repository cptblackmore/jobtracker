export const isLeaderAlive = (lifespan: number) => {
  return (
    Date.now() -
      JSON.parse(localStorage.getItem("leader") || '{"id": 0, "time": 0}')
        .time <
    lifespan
  );
};

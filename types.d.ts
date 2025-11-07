type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}

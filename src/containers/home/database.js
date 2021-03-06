export const events = [
  {
    id: "1234567899",
    name: "event1",
    startDate: "2020-12-08T18:35",
    endDate: "2020-12-08T21:38",
    isAsync: true,
  },
];

export const status = {
  NOTCONNECTED: 100,
  READY: 200,
  CONNECTED: 300,
};

export const participants = [
  {
    id: "123456",
    status: status.NOTCONNECTED,
    batteryLevel: 67,
  },
  {
    id: "234567",
    status: status.READY,
    batteryLevel: 77,
  },
  {
    id: "asad.abbas@koderlabs.com",
    status: status.CONNECTED,
    batteryLevel: 87,
  },
];

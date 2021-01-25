export const elements = {
  Conv2D: {
    args: {
      filters: 1,
      kernelSize: 1,
      strides: 1,
      padding: "valid",
      activation: "relu",
      kernelInitializer: "heUniform",
    },
    color: "#E06666",
  },
  MaxPool2D: {
    args: {
      poolSize: 1,
      strides: 1,
      padding: "valid",
      dataFormat: "channelsFirst",
    },
    color: "#D9D9D9",
  },
  Dense: {
    args: {
      units: 1,
      activation: "relu",
      kernelInitializer: "heUniform",
    },
    color: "#6D9EEB",
  },
  Dropout: {
    args: {
      rate: 0,
    },
    color: "#93C47D",
  },
  Flatten: {
    args: {
      dataFormat: "channelFirst",
    },
    color: "#FFD966",
  },
  Concatenate: {
    args: {},
    color: "#B4A7D6",
  },
  BatchNorm: {
    args: {},
    color: "#93C47D",
  },
  SepConv2D: {
    args: {
      filters: 1,
      kernelSize: 1,
      strides: 1,
      padding: "valid",
      activation: "relu",
      kernelInitializer: "heUniform",
    },
    color: "#E06666",
  },
  AvgPooling2D: {
    args: {
      poolSize: 1,
      strides: 1,
      padding: "valid",
      dataFormat: "channelsFirst",
    },
    color: "#D9D9D9",
  },
};

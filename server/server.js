const tf = require("@tensorflow/tfjs-node");
const { MnistData } = require("./data");
const { modelMapper } = require("../utils/model-mapper");

const http = require("http");
const server = http.createServer();
const socketio = require("socket.io");
const io = socketio(server);

const PORT = process.env.PORT || 8001;

let model;

server.listen(PORT, () => {
  console.log("Server running...");
});

io.on("connection", (socket) => {
  socket.on("compileModel", async (data) => {
    try {
      model.compile({
        optimizer: tf.train[data.optimizer]((learningRate = data.learningRate)),
        loss: data.loss,
        metrics: ["accuracy"],
      });
      socket.emit("compaile_status", {
        status: true,
        message: "Model compailed succesfully",
      });
    } catch (e) {
      socket.emit("compaile_status", {
        status: false,
        message: `Error: ${e.message}`,
      });
    }
  });

  socket.on("createModel", async (data) => {
    try {
      model = modelMapper(data);

      const layers = model.layers.reduce(
        (acc, layer) => [...acc, layer.name],
        []
      );

      socket.emit("create_status", {
        status: true,
        message: "Model created succesfully",
        layers: layers,
      });
    } catch (e) {
      socket.emit("create_status", {
        status: false,
        message: `Error: ${e.message}`,
      });
    }
  });

  socket.on("trainModel", async (data) => {
    const dataset = new MnistData();
    console.log(data);
    const {
      trainImages,
      trainLabels,
      testImages,
      testLabels,
    } = await dataset.load();
    trainMax = trainImages.max();
    trainMin = trainImages.min();
    testMax = testImages.max();
    testMin = testImages.min();
    const normalizedTrain = trainImages
      .sub(trainMin)
      .div(trainMax.sub(trainMin));
    const normalizedTest = testImages.sub(testMin).div(testMax.sub(testMin));

    const onEpochEnd = async (epochs, logs) => {
      const result = {
        val_loss: logs.val_loss.toFixed(3),
        loss: logs.loss.toFixed(3),
        val_acc: logs.val_acc.toFixed(3),
        acc: logs.acc.toFixed(3),
      };
      let weights = {};
      for (let i = 1; i < model.getWeights().length; i++) {
        weights[model.layers[i].name] = model.getWeights()[i].dataSync();
      }

      socket.emit("onEpochEnd", { epochs, result, weights });
    };

    const callback = data.callback
      ? [
          tf.callbacks.earlyStopping({
            monitor: data.monitor,
            patience: data.patience,
          }),
        ]
      : [];

    await model.fit(normalizedTrain, trainLabels, {
      batchSize: data.batchSize,
      epochs: data.epochs,
      shuffle: data.shuffle,
      verbose: 0,
      validationSplit: 0.2,
      callbacks: [
        new tf.CustomCallback({
          onEpochEnd: onEpochEnd,
        }),
        ...callback,
      ],
    });
  });
});

io.on("connect", () => console.log("Connected"));

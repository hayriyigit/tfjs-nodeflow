// const tf = require("@tensorflow/tfjs-node");
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
      model.compile(data);
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
      socket.emit("create_status", {
        status: true,
        message: "Model created succesfully",
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
    console.log(trainMax);
    const normalizedTrain = trainImages
      .sub(trainMin)
      .div(trainMax.sub(trainMin));
    const normalizedTest = testImages.sub(testMin).div(testMax.sub(testMin));
    const lastModel = model;

    await lastModel.fit(normalizedTrain, trainLabels, {
      batchSize: data.batchSize,
      epochs: data.epochs,
      shuffle: data.shuffle,
      verbose: 0,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: async (epochs, logs) => {
          let loss = 0;
          let val_loss = 0;
          try {
            loss = Number(logs.loss.toFixed(3));
            val_loss = Number(logs.val_loss.toFixed(3));
          } catch (err) {
            console.error(err);
          }
          const result = { val_loss, loss };
          console.log(result);
          socket.emit("onEpochEnd", { epochs, result });
        },
      },
    });
  });
});

io.on("connect", () => console.log("Connected"));

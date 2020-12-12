const tf = require("@tensorflow/tfjs-node");

const IMAGE_SIZE = 784;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = 6500;

const NUM_TRAIN_ELEMENTS = 5500;
const NUM_TEST_ELEMENTS = 1000;

const DATA_PATH =
  "https://raw.githubusercontent.com/cerndb/dist-keras/master/examples/data/mnist.csv";

class MnistData {
  load = async () => {
    console.log("... Load function called ...");
    this.CSVDataset = tf.data.csv(DATA_PATH, {
      columnConfigs: { label: { isLabel: true } },
    });
    console.log("... The data received from server ....");

    const flattenedDataset = this.CSVDataset.map(({ xs, ys }) => {
      return { xs: Object.values(xs), ys: Object.values(ys) };
    });

    const it = await flattenedDataset.iterator();
    const xs = [];
    const ys = [];

    for (let i = 0; i < NUM_DATASET_ELEMENTS; i++) {
      let e = await it.next();

      xs.push(e.value.xs);
      ys.push(...e.value.ys);
    }

    const trainImagesArray = xs.slice(0, NUM_TRAIN_ELEMENTS);
    const trainLabelsArray = tf
      .oneHot(ys.slice(0, NUM_TRAIN_ELEMENTS), NUM_CLASSES)
      .arraySync();
    const testImagesArray = xs.slice(NUM_TRAIN_ELEMENTS, NUM_DATASET_ELEMENTS);
    const testLabelsArray = tf
      .oneHot(ys.slice(NUM_TRAIN_ELEMENTS, NUM_DATASET_ELEMENTS), NUM_CLASSES)
      .arraySync();

    const trainImages = tf
      .tensor2d(trainImagesArray, [NUM_TRAIN_ELEMENTS, IMAGE_SIZE])
      .reshape([NUM_TRAIN_ELEMENTS, 28, 28, 1]);
    const trainLabels = tf.tensor2d(trainLabelsArray, [
      NUM_TRAIN_ELEMENTS,
      NUM_CLASSES,
    ]);
    const testImages = tf
      .tensor2d(testImagesArray, [NUM_TEST_ELEMENTS, IMAGE_SIZE])
      .reshape([NUM_TEST_ELEMENTS, 28, 28, 1]);
    const testLabels = tf.tensor2d(testLabelsArray, [
      NUM_TEST_ELEMENTS,
      NUM_CLASSES,
    ]);

    return {
      trainImages,
      trainLabels,
      testImages,
      testLabels,
    };
  };
}

module.exports = {
  MnistData,
};

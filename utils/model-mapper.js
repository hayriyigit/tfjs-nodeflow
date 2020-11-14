import * as tf from "@tensorflow/tfjs";
import { models } from "@tensorflow/tfjs";

export const modelMapper = (graph) => {
  const edges = graph.filter((node) => node.id.startsWith("reactflow__edge"));
  const nodes = graph.filter((node) => !node.id.startsWith("reactflow__edge"));
  const inputNode = graph.filter((node) => node.type == "input");

  const tree = nodes.reduce((acc, current) => {
    acc[current.id] = {
      id: current.id,
      childs: [],
      parents: [],
      args: nodes.filter((node) => node.id == current.id)[0].data.args,
    };

    const incomeEdges = edges.filter((edge) => edge.target == current.id);
    const outcomeEdges = edges.filter((edge) => edge.source == current.id);

    incomeEdges.map((edge) => {
      acc[current.id].parents = [...acc[current.id].parents, edge.source];
    });

    outcomeEdges.map((edge) => {
      acc[current.id].childs = [...acc[current.id].childs, edge.target];
    });

    return acc;
  }, {});

  console.log(tree);
  createModel(tree);
};

const createModel = (tree) => {
  window["input"] = tf.input({ shape: tree.input.args.shape });

  let childs = tree.input.childs;

  createLayers(childs, tree);

  const outputs = createOutputs(tree).reduce((acc, curr) => {
    acc.push(window[String(curr)]);
    return acc;
  }, []);

  // console.log(outputs);

  const model = tf.model({ inputs: input, outputs: outputs });

  model.summary();
};

const createLayers = (childs, tree) => {
  let childs_copy = childs.slice();

  if (childs.length == 0) {
    return;
  }
  childs.map((child) => {
    console.log(childs);
    if (tree[child].parents.length == 1) {
      window[String(child)] = tf.layers
        .conv2d(tree[child].args)
        .apply(window[String(tree[child].parents[0])]);

      console.log("LAYER ADDED: ", child);

      childs_copy.shift();
      childs_copy.push(...tree[child].childs);
      childs_copy = [...new Set([...childs_copy])];
    } else {
      try {
        const parents = tree[child].parents.reduce((acc, curr) => {
          acc.push(window[String(curr)]);
          return acc;
        }, []);

        window[String(child)] = tf.layers
          .concatenate({ axis: 1, name: String(child) })
          .apply(parents);

        console.log("CONCAT: ", child, parents);

        childs_copy.shift();
        childs_copy.push(...tree[child].childs);
        childs_copy = [...new Set([...childs_copy])];
      } catch (e) {
        console.error(e);
        const element = childs_copy[0];
        childs_copy.shift();
        childs_copy.push(element);
      }
    }
  });

  createLayers(childs_copy, tree);
};

const createOutputs = (tree) => {
  let outputs = [];

  Object.keys(tree).map((key) => {
    tree[key].childs.length < 1 ? outputs.push(key) : null;
  });

  return outputs;
};

let feedbackArray = [];
let nextId = 1;

function getAll() {
  return feedbackArray;
}

function findById(id) {
  const numericId = Number(id);
  const feedback = feedbackArray.find((feedback) => feedback.id === numericId);
  if (feedback) {
    return feedback;
  } else {
    return false;
  }
}

function addOne(sender, message, rating) {
  if (!sender || !message || !rating) {
    return false;
  }

  const newFeedback = {
    id: nextId++,
    sender,
    message,
    rating,
  };
  feedbackArray.push(newFeedback);
  return newFeedback;
}

function updateOneById(id, updatedData) {
  const feedback = findById(id);
  if (feedback) {
    if (updatedData.sender) {
      feedback.sender = updatedData.sender;
    }
    if (updatedData.message) {
      feedback.message = updatedData.message;
    }
    if (updatedData.rating) {
      feedback.rating = updatedData.rating;
    }
    return feedback;
  }
  return false;
}

function deleteOneById(id) {
  const feedback = findById(id);
  if (feedback) {
    const initialLength = feedbackArray.length;
    feedbackArray = feedbackArray.filter(
      (feedback) => feedback.id !== Number(id)
    );
    if (feedbackArray.length === 0) {
      nextId = 1;
    }
    return feedbackArray.length < initialLength;
  }

  return;
}

if (require.main === module) {
  let result = addOne("Tony Lee", "Course is very good", 5);
  console.log(result);
  result = addOne("Bella Smith", "It is a good course", 4);
  console.log(result);

  console.log("getAll called:", getAll());

  console.log("findById called:", findById(1));

  console.log(
    "updateOneById called:",
    updateOneById(2, { message: "On second thought, couse is just ok", rating: 3 })
  );
  console.log("findById called after item updated:", findById(2));

  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

Feedback = {
  getAll,
  findById,
  addOne,
  updateOneById,
  deleteOneById,
};

module.exports = Feedback;

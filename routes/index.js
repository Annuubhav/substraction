var express = require('express');
var router = express.Router();
var _ = require('lodash')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Questions. */
router.get('/questions', async function(req, res, next) {
  const { questions, digits_in_subtrahend, digits_in_minuend, has_borrowing } = req.query

  if (questions < 1) {
    res.json({
      status: false,
      message: 'Please provide a valid questions value'
    })

  }

  if (digits_in_subtrahend > digits_in_minuend) {
    res.json({
      status: false,
      message: 'Subtrahend value should be less than minuend'
    })
  }

  let response = []

  for (let i = 0; i < questions; i++) {
    let numbers = {}
    numbers.minuend = generateMinuend(digits_in_minuend)
    numbers.subtrahend = generateNumber(digits_in_subtrahend, parseInt(has_borrowing), digits_in_subtrahend == digits_in_minuend ? numbers.minuend : 0)
    numbers.correct = (numbers.minuend - numbers.subtrahend)
    let correctNumberString = numbers.correct.toString()

    let min = numbers.correct - parseInt(digits_in_minuend ? correctNumberString.padEnd(correctNumberString.length - 1, 0) : 1)
    let max = numbers.correct + parseInt(digits_in_subtrahend ? correctNumberString.padEnd(correctNumberString.length - 1, 0) : 1)
    numbers.options = _.shuffle([
      numbers.correct,
      getRandomArbitrary(min, max),
      getRandomArbitrary(min, max),
      getRandomArbitrary(min, max)
    ])
    response.push(numbers)
  }

  res.json({
    status: true,
    data: response
  })
})

function generateMinuend (digits) {
return Math.floor(parseInt(digits ? '1'.padEnd(digits, 0) : 1) + Math.random() * parseInt(digits ? '9'.padEnd(digits, 0) : 9))
}

function generateNumber(digits, has_borrowing, number = 0) {
  let randomNumber = +Math.floor(parseInt(digits ? '1'.padEnd(digits, 0) : 1) + Math.random() * parseInt(digits ? '9'.padEnd(digits, 0) : 9))

  if (number && number < randomNumber) {
    return generateNumber(digits, has_borrowing, number)
  }

  if (!has_borrowing && number) {
    let newRandomNumber = randomNumber.toString()
    let newNumber = number.toString()

    for (let i = (digits - 1); i >= 0; i--) {
      if (newRandomNumber[i] > newNumber[i]) {
        return generateNumber(digits, has_borrowing, number)
      }
    }
  }

  if (has_borrowing && number) {
    let newRandomNumber = randomNumber.toString()
    let newNumber = number.toString()
    let is_borrowing_available = 0;

    for (let i = (digits - 1); i >= 0; i--) {
      if (newRandomNumber[i] > newNumber[i]) {
        is_borrowing_available = 1;
      }
    }

    if (!is_borrowing_available) {
      return generateNumber(digits, has_borrowing, number)
    }
  }

  return randomNumber
}

function getRandomArbitrary(min, max) {
  let number = Math.floor(Math.random() * (max - min) + min)
  return number < 0 ? (number * -1) : number;
}

module.exports = router;

const calculateButton = document.getElementById('calculate');
const container = document.getElementById('container');

const workout = document.getElementById('workout');
const weight = document.getElementById('weight');
const reps = document.getElementById('reps');

const NSCA = {
  Deadlift: {
    1: 1.0,
    2: 1.065,
    3: 1.13,
    4: 1.147,
    5: 1.164,
    6: 1.181,
    7: 1.198,
    8: 1.22,
    9: 1.232,
    10: 1.24
  },
  Squat: {
    1: 1.0,
    2: 1.0475,
    3: 1.13,
    4: 1.1575,
    5: 1.2,
    6: 1.242,
    7: 1.284,
    8: 1.326,
    9: 1.368,
    10: 1.41
  },
  BenchPress: {
    1: 1.0,
    2: 1.035,
    3: 1.08,
    4: 1.115,
    5: 1.15,
    6: 1.18,
    7: 1.22,
    8: 1.255,
    9: 1.29,
    10: 1.325
  },
};

const BRZYCKI = {
  1: 1.0,
  2: 1.029,
  3: 1.059,
  4: 1.091,
  5: 1.125,
  6: 1.161,
  7: 1.2,
  8: 1.242,
  9: 1.286,
  10: 1.330,
};

const ONERM_TO_REP = {
  1: 1.0,
  2: 0.943,
  3: 0.906,
  4: 0.881,
  5: 0.856,
  6: 0.831,
  7: 0.807,
  8: 0.786,
  9: 0.765,
  10: 0.744,
  11: 0.723,
  12: 0.703,
};

const calculate1RM = function(workout, weight, reps) {
  if(workout == "데드리프트") {
    return (weight * NSCA.Deadlift[reps]).toFixed(2);
  }
  else if(workout == "스쿼트") {
    return (weight * NSCA.Squat[reps]).toFixed(2);
  }
  else if(workout == "벤치프레스") {
    return (weight * NSCA.BenchPress[reps]).toFixed(2);
  }
  else {
    return (weight * BRZYCKI[reps]).toFixed(2);
  }
}

const calculateReps = function(ONERM, reps) {
  return (ONERM * ONERM_TO_REP[reps]).toFixed(2);
}

calculateButton.onclick = function() {

  let selectedWorkout = workout.options[workout.selectedIndex].value;
  let selectedWeight = weight.value;
  let selectedReps = reps.value;

  if(selectedWorkout == "") {
    alert("운동 종목을 선택해주세요.");
  }
  else if(selectedWeight == "") {
    alert("운동 중량를 입력해주세요.");
  }
  else if(selectedReps == "") {
    alert("운동 횟수를 입력해주세요.");
  }
  else if(selectedReps > 10 || selectedReps < 1) {
    alert("1~10회 사이의 횟수를 입력해주세요.");
  }
  else {
    container.removeChild(container.lastChild);

    let ONERM = calculate1RM(selectedWorkout, selectedWeight, selectedReps); 

    container.appendChild(document.createElement('div')).setAttribute('id', 'result');
    let result = document.getElementById('result');

    result.appendChild(document.createElement('span')).setAttribute('class', 'bold');
    result.lastChild.setAttribute('style', 'margin-left: 20px');
    result.lastChild.textContent = "내 " + selectedWorkout + " 1RM: " + ONERM + "kg";

    result.appendChild(document.createElement('div')).setAttribute('id', 'recommend');
    result.lastChild.setAttribute('style', 'margin-top: 30px');
    let recommend = document.getElementById('recommend');

    recommend.appendChild(document.createElement('span')).setAttribute('class', 'bold');
    recommend.lastChild.setAttribute('style', 'margin-left: 20px');
    recommend.lastChild.textContent = "추천 운동 중량";

    recommend.appendChild(document.createElement('p')).setAttribute('class', 'recommend-comment');
    recommend.lastChild.setAttribute('style', 'margin-left: 25px');
    recommend.lastChild.textContent = "스트렝스 훈련(3reps): " + calculateReps(ONERM, 3) + "kg";
    recommend.appendChild(document.createElement('p')).setAttribute('class', 'recommend-comment');
    recommend.lastChild.setAttribute('style', 'margin-left: 25px');
    recommend.lastChild.textContent = "스트렝스 훈련(5reps): " + calculateReps(ONERM, 5) + "kg";
    recommend.appendChild(document.createElement('p')).setAttribute('class', 'recommend-comment');
    recommend.lastChild.setAttribute('style', 'margin-left: 25px');
    recommend.lastChild.textContent = "스트렝스 + 근비대 훈련(8reps): " + calculateReps(ONERM, 8) + "kg";
    recommend.appendChild(document.createElement('p')).setAttribute('class', 'recommend-comment');
    recommend.lastChild.setAttribute('style', 'margin-left: 25px');
    recommend.lastChild.textContent = "근비대 훈련(10reps): " + calculateReps(ONERM, 10) + "kg";
    recommend.appendChild(document.createElement('p')).setAttribute('class', 'recommend-comment');
    recommend.lastChild.setAttribute('style', 'margin-left: 25px');
    recommend.lastChild.textContent = "근비대 훈련(12reps): " + calculateReps(ONERM, 12) + "kg";
  }

}
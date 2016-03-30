
var notSet = '??';
const initState = {
  citiesArr: [],
  notSet: notSet,
  currentCity: notSet,
  temp: notSet,
  icon: notSet,
  pressure: notSet,
  humidity: notSet
};

function ReactWeather(state=initState, action)
{
  switch (action.type) {
    case 'UPDATE_STATE':
      return mutateObj(state, action.payload);

    default:
      return state;
  }
}

function mutateObj(parent, updateData) {
  return Object.assign({}, parent, updateData);
}

export default ReactWeather;

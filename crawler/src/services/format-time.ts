import moment from 'moment'
export const formatTime = (time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') => {
  const date = moment(time, 'DD/MM/YYYY, HH:mm (Z)')
  return date.toDate()
}

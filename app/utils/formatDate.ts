import moment from 'moment';

  export default function formatDate(date: Date) {
    const NewDate = moment(date).format("DD/MM/YYYY hh:mm A");
    return NewDate;
  }
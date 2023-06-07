const axios = require('axios');
const cron = require('cron');
const moment = require('moment');

exports.message = async (user, minutes, hour) => {
  try {
    const formatDateCustom = (date, format) => {
      try {
        if (date == null) {
          return null;
        } else {
          return moment(date).format(format);
        }
      } catch (error) {
        return '';
      }
    };
    let minutesCheck = minutes || 0;
    let hourCheck = hour || 9;

    const date = user.birth_date;
    const birthMonth = formatDateCustom(date, 'MM');
    const birthDate = formatDateCustom(date, 'DD');

    // Define the cron schedule for 9 AM daily
    // const cronSchedule = `* * * * *`;
    const cronSchedule = `${minutesCheck} ${hourCheck} ${birthDate} ${birthMonth} *`;
    console.log(minutesCheck, hourCheck, birthDate, birthMonth);
    // console.log(cronSchedule);
    // Create a new cron job
    const job = new cron.CronJob({
      cronTime: cronSchedule,
      onTick: () => {
        // Get the current local time
        const currentTime = user.birth_date;

        // Create the payload for the message
        const payload = {
          message: `“Hey, ${user.first_name} ${user.last_name} it’s your birthday”`,
          timestamp: currentTime,
        };

        // Make the HTTP POST request to the endpoint
        const url = 'http://localhost:8080/user/message';

        axios
          .post(url, payload)
          .then((response) => {
            console.log('Message sent successfully at', currentTime);
          })
          .catch((error) => {
            console.error('Failed to send the message:', error);
            minutesCheck += 5;
            if (minutesCheck > 60) {
              hourCheck += 1;
              if (hourCheck > 24) {
                hourCheck = 0;
              }
            }
            this.message(user, minutesCheck, hourCheck);
          });
      },
      start: false,
      timeZone: user.location, // Replace with the user's time zone
    });

    // Start the cron job
    job.start();
  } catch (error) {}
};

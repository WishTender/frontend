import confetti from "canvas-confetti";
import theme from "../../theme";

const openGift = async (
  e,
  callback,
  userContext,
  notificationContext,
  orderId
) => {
  const { clientHeight, clientWidth } = document.documentElement;
  const eTop = window.pageYOffset + e.target.getBoundingClientRect().top;
  const eFromLeft = window.pageXOffset + e.target.getBoundingClientRect().left;
  let vel;
  if (clientWidth <= 850) {
    vel = (clientWidth / 850) * 45;
  } else {
    vel = 45;
  }
  let ang;
  if (vel < 45) {
    ang = (vel / 45) * 80 + 80;
  } else {
    ang = 160;
  }

  confetti({
    zIndex: 9000,
    angle: ang,
    startVelocity: vel,
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.secondary.main,
      theme.palette.primary.light,
    ],
    origin: {
      x: eFromLeft / clientWidth,
      y: eTop / clientHeight,
    },
  });
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/orders/seen/${orderId}`,
    {
      credentials: "include",
      method: "PATCH",
      headers,
    }
  )
    .then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        const notifications = await notificationContext.getNotifications(
          userContext.user.aliases[0]
        );
        notificationContext.setNotifications(notifications);
        callback();
      } else {
        console.log(res.status);
      }
    })
    .catch(console.log);
};

export default openGift;

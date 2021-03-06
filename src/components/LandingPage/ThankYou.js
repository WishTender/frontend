import React from "react";

function ThankYou() {
  return (
    <div className="thank_you">
      {/* {heroSection()}
      {fourPointExplanation()} */}

      <h2>Success! You've been added to the waitlist</h2>
      <p>
        Thank you for signing up. Access to our beta program is limited. If you
        would like to fast-track your way into beta approval, you can enter to
        win fast-track access by being a super supporter.&#128522;{" "}
      </p>
      <p>
        Simply tweet why you're excited about WishTender and tag two people who
        might find value in WishTender. Don't forget to tag{" "}
        <a href="https://twitter.com/wishtender">@WishTender</a> so we can find
        your tweet! Here's a sample{" "}
        <a href="https://twitter.com/intent/tweet?text=I%27m%20excited%20to%20try%20@WishTender%20because%20%5Bfill%20out%20why%20you%27re%20excited%20for%20WishTender%5D.%20People%20that%20might%20also%20be%20interested%3A%20%5Btag%20some%20people%20here%5D">
          tweet
        </a>
        .
      </p>
    </div>
  );
}

export default ThankYou;

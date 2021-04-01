import { useEffect, useRef } from "react";
import _ from "lodash";

/**
 * tracks component renders
 * @param {String} component component name ex: App.name
 * @param {Object} props
 * @param {Object} state
 */
export default function useTraceUpdate(component, props, state) {
  const prevP = useRef(props);
  const prevS = useRef(state);
  let render = useRef(0);
  useEffect(() => {
    render.current++;
    console.log(component, "rendered ", render.current, " times");
    if (props) {
      const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
        if (prevP.current[k] !== v) {
          ps[k] = [prevP.current[k], v];
        }
        return ps;
      }, {});
      if (Object.keys(changedProps).length > 0) {
        const displayText = Object.entries(changedProps).map((s) =>
          typeof s[1][0] === "object" && typeof s[1][1] === "object"
            ? `${s[0]} object changed, content of object ${
                _.isEqual(s[1][0], s[1][1]) ? "didn't" : "did"
              }  change ${
                !_.isEqual(s[1][0], s[1][1])
                  ? `from ${s[1][0]} to ${s[1][1]}`
                  : ""
              }`
            : `${s[0]} changed from ${s[1][0]} \nto ${s[1][1]}`
        );
        console.log(
          "r:" + render.current + " info: " + component + " changed props:",
          displayText.join("\n")
        );
      }
    }
    prevP.current = props;
    if (state) {
      const changedState = Object.entries(state).reduce((ps, [k, v]) => {
        if (prevS.current[k] !== v) {
          ps[k] = [prevS.current[k], v];
        }
        return ps;
      }, {});
      if (Object.keys(changedState).length > 0) {
        const displayText = Object.entries(changedState).map((s) =>
          typeof s[1][0] === "object" && typeof s[1][1] === "object"
            ? `${s[0]} object changed, content of object ${
                _.isEqual(s[1][0], s[1][1]) ? "didn't" : "did"
              } change ${
                !_.isEqual(s[1][0], s[1][1])
                  ? `from ${s[1][0]} to ${s[1][1]}`
                  : ""
              }`
            : `${s[0]} changed from ${s[1][0]} \nto ${s[1][1]}`
        );
        console.log(
          "r:" + render.current + " " + component + " changed state:",
          displayText.join("\n")
        );
      }
    }
    if (render.current === 1) {
      console.log("r:" + render.current + ": initial render");
    }
    prevS.current = state;
  });
}

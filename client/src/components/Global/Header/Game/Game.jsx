import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useGlobalContext } from "../../../../context/useGlobal";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";

export const Game = () => {
  const { global, setGlobal } = useGlobalContext();
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "../../../../../Build/game.loader.js",
    dataUrl: "../../../../../Build/game.data.unityweb",
    frameworkUrl: "../../../../../Build/game.framework.js.unityweb",
    codeUrl: "../../../../../Build/game.wasm.unityweb",
  });
  const [delay, setDelay] = useState(true);
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const recaptureInputAndFocus = function () {
    if (canvas) {
      canvas.setAttribute("tabindex", "1");
      canvas.focus();
    }
  };

  useEffect(() => {
    if (canvas && global.gameAdv.isFocus) {
      canvas.setAttribute("tabindex", "1");
      canvas.focus();
    }
  }, [global.gameAdv.isFocus, global.gameAdv.isLoading]);

  const [item, setItem] = useState("");

  // window.addEventListener("storage", (e) => {
  //   setItem(JSON.parse(window.localStorage.getItem("cart")));
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     window.dispatchEvent(new Event("storage"));
  //   }, 250);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (
  //     item &&
  //     item.mug.length > 0 &&
  //     item.mug !== "ok" &&
  //     item.mug !== "custom"
  //   )
  //     setGlobal({
  //       mugsLimited: {
  //         // ...global.mugsLimited,
  //         nameItem: item.mug,
  //         active: true,
  //       },
  //     });
  //   else
  //     setGlobal({
  //       mugsLimited: {
  //         ...global.mugsLimited,
  //         nameItem: item.mug,
  //         active: false,
  //       },
  //     });
  // }, [JSON.stringify(item)]);
  
  const { listWindows, switchWindows } = useManagerWindows(["active"]);
  
  useEffect(() => {
    !global.mugsLimited.active && switchWindows("active", !global.gameAdv.isFocus, 500, 500);
  }, [global.gameAdv.isFocus]);
  
  useEffect(() => {
    if (loadingProgression && loadingProgression < 1)
      setGlobal({
        gameAdv: {
          ...global.gameAdv,
          activeGame: true,
          isLoading: true,
          loadingProgress: Math.round(loadingProgression * 100) || 0,
        },
      });
    else if (loadingProgression === 1)
      setGlobal({
        gameAdv: {
          ...global.gameAdv,
          isLoading: false,
          loadingProgress: 100,
        },
      });

    // * Manager loading progress in Unity Game to send redux.
    return () => {
      setGlobal({
        gameAdv: {
          ...global.gameAdv,
          activeGame: false,
          isLoading: false,
          loadingProgress: 0,
        },
      });
    };
  }, [loadingProgression]);

  return (
    <div
      style={{
        width: "100%",
      }}
      onBlur={() => {
        setGlobal({ gameAdv: { ...global.gameAdv, isFocus: false } });
      }}
      onClick={() => {
        setGlobal({ gameAdv: { ...global.gameAdv, isFocus: true } });
      }}
    >
      <Unity
        unityProvider={unityProvider}
        className="unity-container"
        ref={canvasRef}
      />

      {listWindows.active && (
        <div
          className={`game-in-pause ${
            !global.gameAdv.isFocus ? "anim-opacity" : "anim-opacity-reverse"
          }`}
        >
          <p className="anim-text-brightness">GAME PAUSE</p>
        </div>
      )}
    </div>
  );
};

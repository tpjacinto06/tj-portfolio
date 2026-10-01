import '../styles/device-frames.css';

// Native pixel size of each frame's screen. The gallery scales from these.
export const DEVICES = {
  iphone: { className: 'iphone-x', width: 375, height: 812 },
  macbook: { className: 'macbook', width: 960, height: 600 },
};

// The marvel-devices markup, which src/styles/device-frames.css expects
// verbatim — most of these empty divs are a bezel, button or sensor.
export default function DeviceFrame({ type, children }) {
  const isPhone = type === 'iphone';

  return (
    <div className={`marvel-device ${DEVICES[type].className}`}>
      <div className="inner" />
      {isPhone && (
        <div className="notch">
          <div className="camera" />
          <div className="speaker" />
        </div>
      )}
      <div className="top-bar" />
      <div className="sleep" />
      <div className="bottom-bar" />
      <div className="volume" />
      <div className="camera" />
      <div className="sensor" />
      <div className="speaker" />
      <div className="sensors" />
      <div className="more-sensors" />
      {isPhone && (
        <div className="overflow">
          <div className="shadow shadow--tr" />
          <div className="shadow shadow--tl" />
          <div className="shadow shadow--br" />
          <div className="shadow shadow--bl" />
        </div>
      )}
      <div className="inner-shadow" />
      <div className="screen">{children}</div>
      <div className="home" />
      <div className="bottom-bar" />
    </div>
  );
}

// @flow

import TrackSelector from "../components/TrackSelector";
import NightingaleChart from "../components/NightingaleChart";
import KeyboardListener from "../components/KeyboardListener";
import Track from "../components/Track";
import Wordmark from "../components/Wordmark";
import LevelThermometer from "../components/LevelThermometer";
import {
  eligibleTitles,
  trackIds,
  milestones,
  milestoneToPoints,
} from "../constants";
import PointSummaries from "../components/PointSummaries";
import type { Milestone, MilestoneMap, TrackId } from "../constants";
import React from "react";
import TitleSelector from "../components/TitleSelector";

type SnowflakeAppState = {
  milestoneByTrack: MilestoneMap,
  name: string,
  title: string,
  focusedTrackId: TrackId,
};

const hashToState = (hash: String): ?SnowflakeAppState => {
  if (!hash) return null;
  const result = defaultState();
  const hashValues = hash.split("#")[1].split(",");
  if (!hashValues) return null;
  trackIds.forEach((trackId, i) => {
    result.milestoneByTrack[trackId] = coerceMilestone(Number(hashValues[i]));
  });

  if (hashValues[7]) result.name = decodeURI(decodeURI(hashValues[7]));
  // if (hashValues[17]) result.title = decodeURI(hashValues[17]);
  return result;
};

const coerceMilestone = (value: number): Milestone => {
  // HACK I know this is goofy but i'm dealing with flow typing
  switch (value) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return 0;
  }
};

const emptyState = (): SnowflakeAppState => {
  return {
    name: "",
    title: "",
    milestoneByTrack: {
      ARCHITECTURE: 0,
      QUALITY: 0,
      PROJECT_OWNERSHIP: 0,
      COMMUNICATION: 0,
      INITIATIVE: 0,
      MENTORSHIP: 0,
      WELLBEING: 0,
    },
    focusedTrackId: "ARCHITECTURE",
  };
};

const defaultState = (): SnowflakeAppState => {
  return {
    name: "Engineer Name",
    milestoneByTrack: {
      ARCHITECTURE: 0,
      QUALITY: 0,
      PROJECT_OWNERSHIP: 0,
      COMMUNICATION: 0,
      INITIATIVE: 0,
      MENTORSHIP: 0,
      WELLBEING: 0,
    },
    focusedTrackId: "ARCHITECTURE",
  };
};

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null;
  const values = trackIds
    .map((trackId) => state.milestoneByTrack[trackId])
    .concat(encodeURI(state.name));
  // .concat(encodeURI(state.name), encodeURI(state.title));

  console.log({ values });
  return values.join(",");
};

type Props = {};

class SnowflakeApp extends React.Component<Props, SnowflakeAppState> {
  constructor(props: Props) {
    super(props);
    this.state = emptyState();
  }

  componentDidUpdate() {
    const hash = stateToHash(this.state);
    if (hash) window.location.replace(`#${hash}`);
  }

  componentDidMount() {
    const state = hashToState(window.location.hash);
    if (state) {
      this.setState(state);
    } else {
      this.setState(defaultState());
    }
  }

  render() {
    return (
      <main>
        <style jsx global>{`
          body {
            font-family: Helvetica;
          }
          main {
            width: 960px;
            margin: 0 auto;
          }
          p {
            color: #333;
          }
          .name-input {
            border: none;
            display: block;
            border-bottom: 2px solid #fff;
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
            width: 380px;
            margin-bottom: 10px;
            text-align: center;
            margin-top: 10px;
          }
          .name-input:hover,
          .name-input:focus {
            border-bottom: 2px solid #ccc;
            outline: 0;
          }
          a {
            color: #888;
            text-decoration: none;
          }
          a svg:hover {
            fill: #b01aa7;
          }
        `}</style>
        <div style={{ margin: "19px auto 0", width: 103 }}>
          <Wordmark />
        </div>
        <a
          href="https://getaround.slack.com/archives/C02FW0D79/p1600714402008200?thread_ts=1600714348.008100&cid=C02FW0D79"
          target="_blank"
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
            width="20px"
            height="20px"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <div>
          <div>
            <form style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                className="name-input"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                placeholder="Name"
              />
              {/* <TitleSelector
                milestoneByTrack={this.state.milestoneByTrack}
                currentTitle={this.state.title}
                setTitleFn={(title) => this.setTitle(title)}
              /> */}
            </form>
            {/* <PointSummaries milestoneByTrack={this.state.milestoneByTrack} /> */}
            {/* <LevelThermometer milestoneByTrack={this.state.milestoneByTrack} /> */}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <NightingaleChart
              milestoneByTrack={this.state.milestoneByTrack}
              focusedTrackId={this.state.focusedTrackId}
              handleTrackMilestoneChangeFn={(track, milestone) =>
                this.handleTrackMilestoneChange(track, milestone)
              }
            />
          </div>
        </div>
        <TrackSelector
          milestoneByTrack={this.state.milestoneByTrack}
          focusedTrackId={this.state.focusedTrackId}
          setFocusedTrackIdFn={this.setFocusedTrackId.bind(this)}
        />
        <KeyboardListener
          selectNextTrackFn={this.shiftFocusedTrack.bind(this, 1)}
          selectPrevTrackFn={this.shiftFocusedTrack.bind(this, -1)}
          increaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(
            this,
            1
          )}
          decreaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(
            this,
            -1
          )}
        />
        <Track
          milestoneByTrack={this.state.milestoneByTrack}
          trackId={this.state.focusedTrackId}
          handleTrackMilestoneChangeFn={(track, milestone) =>
            this.handleTrackMilestoneChange(track, milestone)
          }
        />
      </main>
    );
  }

  handleTrackMilestoneChange(trackId: TrackId, milestone: Milestone) {
    const milestoneByTrack = this.state.milestoneByTrack;
    milestoneByTrack[trackId] = milestone;

    // const titles = eligibleTitles(milestoneByTrack);
    // const title =
    //   titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title;
    // this.setState({ milestoneByTrack, focusedTrackId: trackId, title });

    this.setState({ milestoneByTrack, focusedTrackId: trackId });
  }

  shiftFocusedTrack(delta: number) {
    let index = trackIds.indexOf(this.state.focusedTrackId);
    index = (index + delta + trackIds.length) % trackIds.length;
    const focusedTrackId = trackIds[index];
    this.setState({ focusedTrackId });
  }

  setFocusedTrackId(trackId: TrackId) {
    let index = trackIds.indexOf(trackId);
    const focusedTrackId = trackIds[index];
    this.setState({ focusedTrackId });
  }

  shiftFocusedTrackMilestoneByDelta(delta: number) {
    let prevMilestone = this.state.milestoneByTrack[this.state.focusedTrackId];
    let milestone = prevMilestone + delta;
    if (milestone < 0) milestone = 0;
    if (milestone > 5) milestone = 5;
    this.handleTrackMilestoneChange(
      this.state.focusedTrackId,
      ((milestone: any): Milestone)
    );
  }

  // setTitle(title: string) {
  //   let titles = eligibleTitles(this.state.milestoneByTrack);
  //   title = titles.indexOf(title) == -1 ? titles[0] : title;
  //   this.setState({ title });
  // }
}

export default SnowflakeApp;

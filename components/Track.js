// @flow

import { tracks, milestones, categoryColorScale } from "../constants";
import React from "react";
import type { MilestoneMap, TrackId, Milestone } from "../constants";

type Props = {
  milestoneByTrack: MilestoneMap,
  trackId: TrackId,
  handleTrackMilestoneChangeFn: (TrackId, Milestone) => void,
};

const milestoneTitleMap = {
  0: "❔",
  1: "🛵",
  2: "🚗",
  3: "🏎️",
  4: "🚄",
  5: "🚀",
};

class Track extends React.Component<Props> {
  render() {
    const track = tracks[this.props.trackId];
    const currentMilestoneId = this.props.milestoneByTrack[this.props.trackId];
    const currentMilestone = track.milestones[currentMilestoneId - 1];
    return (
      <div className="track">
        <style jsx>{`
          div.track {
            margin: 0 0 20px 0;
            padding-bottom: 20px;
            border-bottom: 2px solid #ccc;
          }
          h2 {
            margin: 0 0 10px 0;
          }
          p.track-description {
            margin-top: 0;
            padding-bottom: 20px;
            border-bottom: 2px solid #ccc;
          }
          table {
            border-spacing: 3px;
          }
          td {
            line-height: 50px;
            width: 50px;
            text-align: center;
            background: #eee;
            font-weight: bold;
            font-size: 24px;
            border-radius: 3px;
            cursor: pointer;
          }
          ul {
            line-height: 1.5em;
          }
        `}</style>
        <h2>{track.displayName}</h2>
        <p className="track-description">{track.description}</p>
        <div style={{ display: "flex" }}>
          <table style={{ marginRight: 50 }}>
            <tbody>
              {milestones
                .slice()
                .reverse()
                .map((milestone) => {
                  const isMet = milestone <= currentMilestoneId;
                  return (
                    <tr key={milestone}>
                      <td
                        onClick={() =>
                          this.props.handleTrackMilestoneChangeFn(
                            this.props.trackId,
                            milestone
                          )
                        }
                        style={{
                          border: `4px solid ${
                            milestone === currentMilestoneId
                              ? "#390446"
                              : isMet
                              ? categoryColorScale(track.category)
                              : "#eee"
                          }`,
                          background: isMet
                            ? categoryColorScale(track.category)
                            : undefined,
                        }}
                      >
                        {milestoneTitleMap[milestone]}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {currentMilestone ? (
            <div style={{ flex: 1 }}>
              <h3>{currentMilestone.summary}</h3>
              <h4>Example behaviors:</h4>
              <ul>
                {currentMilestone.signals.map((signal, i) => (
                  <li key={i}>{signal}</li>
                ))}
              </ul>
              <h4>Example tasks:</h4>
              <ul>
                {currentMilestone.examples
                  .filter(
                    (example) =>
                      example.length && !example.includes("~~[draft]")
                  )
                  .map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Track;

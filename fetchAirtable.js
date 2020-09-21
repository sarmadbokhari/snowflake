const firebase = require("firebase");
const Airtable = require("airtable");

firebase.initializeApp({
  authDomain: "getaround-snowflake.firebaseapp.com",
  databaseURL: "https://getaround-snowflake.firebaseio.com",
  projectId: "getaround-snowflake",
  storageBucket: "getaround-snowflake.appspot.com",
  messagingSenderId: "805842416539",
  appId: "1:805842416539:web:0d6d5f7aca3b8bfeeea73e",
});

async function fetchTracks() {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: functions.config().airbase.key }).base(
    "appZ0kngZ5LTRLAh7"
  );

  let tracks = await base("Tracks")
    .select({
      view: "Grid view",
    })
    .all();

  tracks = tracks.map((record) => {
    return {
      displayName: record.get("Title"),
      description: record.get("Description"),
      id: record.get("ID"),
    };
  });

  tracks = Object.assign(
    {},
    ...tracks.map((track) => {
      return { [track.id]: { ...track } };
    })
  );

  for (const track in tracks) {
    let milestones = await base(track)
      .select({
        view: "Grid view",
      })
      .all();

    milestones = milestones.map((record) => {
      return {
        summary: record.get("Summary"),
        signals: [
          record.get("Signal 1") || "",
          record.get("Signal 2") || "",
          record.get("Signal 3") || "",
        ],
        examples: [
          record.get("Example 1") || "",
          record.get("Example 2") || "",
          record.get("Example 3") || "",
        ],
      };
    });

    tracks[track].milestones = milestones;
  }

  firebase
    .database()
    .ref("tracks")
    .set({
      ...tracks,
    });
}

fetchTracks();

// @flow
import * as d3 from "d3";
import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    authDomain: "getaround-snowflake.firebaseapp.com",
    databaseURL: "https://getaround-snowflake.firebaseio.com",
    projectId: "getaround-snowflake",
    storageBucket: "getaround-snowflake.appspot.com",
    messagingSenderId: "805842416539",
    appId: "1:805842416539:web:0d6d5f7aca3b8bfeeea73e",
  });
}

export type TrackId =
  | "PROJECT_OWNERSHIP"
  | "COMMUNICATION"
  | "ARCHITECTURE"
  | "COMMUNICATION"
  | "INITIATIVE"
  | "MENTORSHIP"
  | "PROJECT_OWNERSHIP"
  | "QUALITY"
  | "WELLBEING";
export type Milestone = 0 | 1 | 2 | 3 | 4 | 5;

export type MilestoneMap = {
  PROJECT_OWNERSHIP: Milestone,
  COMMUNICATION: Milestone,
  ARCHITECTURE: Milestone,
  COMMUNICATION: Milestone,
  INITIATIVE: Milestone,
  MENTORSHIP: Milestone,
  PROJECT_OWNERSHIP: Milestone,
  QUALITY: Milestone,
  WELLBEING: Milestone,
};
export const milestones = [0, 1, 2, 3, 4, 5];

export const milestoneToPoints = (milestone: Milestone): number => {
  switch (milestone) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 6;
    case 4:
      return 12;
    case 5:
      return 20;
    default:
      return 0;
  }
};

export const pointsToLevels = {
  0: "1.1",
  5: "1.2",
  11: "1.3",
  17: "2.1",
  23: "2.2",
  29: "2.3",
  36: "3.1",
  43: "3.2",
  50: "3.3",
  58: "4.1",
  66: "4.2",
  74: "4.3",
  90: "5.1",
  110: "5.2",
  135: "5.3",
};

export const maxLevel = 135;

export type Track = {
  displayName: string,
  category: string, // TK categoryId type?
  description: string,
  milestones: {
    summary: string,
    signals: string[],
    examples: string[],
  }[],
};

type Tracks = {|
  PROJECT_OWNERSHIP: Track,
  COMMUNICATION: Track,
  ARCHITECTURE: Track,
  COMMUNICATION: Track,
  INITIATIVE: Track,
  MENTORSHIP: Track,
  PROJECT_OWNERSHIP: Track,
  QUALITY: Track,
  WELLBEING: Track,
|};

export let tracks: Tracks = {
  ARCHITECTURE: {
    description:
      "Develops expertise and brings experienced judgement to the abstraction and design of software systems",
    displayName: "Architecture",
    id: "ARCHITECTURE",
    milestones: [
      {
        examples: [
          "~~[draft] Made safe and effective Ansible changes~~\n",
          "~~[draft] Implemented new ETL pipelines based on existing ones~~\n",
          "~~[draft] Resolved out of disk errors independently~~\n",
        ],
        signals: [
          "Writes thorough postmortems for service outages\n",
          "Makes simple configuration changes to services\n",
          "Performs backfills safely and effectively, without causing pages\n",
        ],
        summary:
          "Works effectively within established structures, following current best practices",
      },
      {
        examples: [
          "Upgraded NodeJS from 8.0 to 8.1.1\n",
          "~~[draft] Built custom packages for RPMs~~\n",
          "Increased performance of geospatial index server queries by refactoring in-memory data structures\n",
        ],
        signals: [
          "Made minor version upgrades to technologies\n",
          "Builds machine learning jobs within the ML framework\n",
          "Triages service issues correctly and independently\n",
        ],
        summary:
          "Develops new instances of existing architecture, or minor improvements to existing architecture",
      },
      {
        examples: [
          "Upgraded to NodeJS 10.0 from 8.0 and resolved all breaking changes throughout codebase\n",
          "Designed and built the Charges Service\n",
          "Designed flexible framework for writing machine learning jobs\n",
        ],
        signals: [
          "Acts as primary maintainer for existing critical systems\n",
          "Designs and deploys reliable, moderately complex systems\n",
          "Makes major version upgrades to libraries and effectively manages breaking changes within codebase while notifying other engineers of new patterns to be aware of\n",
        ],
        summary:
          "Successfully ships new architecture of moderate complexity, or major new features in existing architecture",
      },
      {
        examples: [
          "Derisked, defined architecture, and then guided migration of our iOS app to SwiftUI\n",
          "~~[draft] Defined and developed Getaround's continuous delivery strategy~~\n",
          "~~[draft] Introduced Kinesis and pioneered streaming events pipeline~~\n",
        ],
        signals: [
          "Designs complex projects that encompass multiple systems and technologies\n",
          "Demonstrates deep knowledge of foundational systems\n",
          "Introduces new databases and technologies to meet underserved needs\n",
        ],
        summary:
          "Builds complex, reusable architecture that pioneer best practices for other engineers",
      },
      {
        examples: [
          "~~[draft] Invented a novel ML technique that advanced the state of the art~~\n",
          "",
          "~~[draft] Developed and implemented HA strategy~~\n",
        ],
        signals: [
          "Designs transformational projects in service of long-term goals\n",
          "Defines the strategic vision for foundational work and supporting technologies\n",
          "Invents industry-leading techniques to solve complex problems\n",
        ],
        summary:
          "Is an industry-leading expert in foundational engineering or sets strategic foundational direction for an eng team",
      },
    ],
  },
  COMMUNICATION: {
    description:
      "Listens effectively, then shares the right amount of information with the right people, at the right time.",
    displayName: "Communication",
    id: "COMMUNICATION",
    milestones: [
      {
        examples: [
          "~~[draft] Updated The Watch before running a backfill~~\n",
          "Keeps status of Jira tickets up to date\n",
          "Writes well-structured commit messages\n",
        ],
        signals: [
          "Communicates project status clearly and effectively\n",
          "Collaborates with others with empathy\n",
          "Asks for help at the appropriate juncture\n",
        ],
        summary:
          "Communicates effectively with close stakeholders when called upon, and incorporates constructive feedback",
      },
      {
        examples: [
          "Received and integrated critical feedback on a rushed PR positively\n",
          "Created cross-team Slack channel for a new Spirit page\n",
          "Collected comments from domain experts on an EDD and incorporated them into the chosen approach\n",
        ],
        signals: [
          "Practises active listening, seeking to understand before being understood.\n",
          "Ensures stakeholders are aware of current blockers\n",
          "Chooses the appropriate tools for accurate and timely communication\n",
        ],
        summary:
          "Communicates with the wider team appropriately, focusing on timeliness and good quality conversations",
      },
      {
        examples: [
          "Directed team response effectively during several outages\n",
          "Gave a substantial EPDD-wide presentation on the Charges Service\n",
          "Created a new collaborative doc to automate status updates from the team\n",
        ],
        signals: [
          "Resolves communication difficulties between others\n",
          "Anticipates and shares schedule deviations in plenty of time\n",
          "Attends to inclusive communication practices on their team\n",
        ],
        summary:
          "Proactively shares information, actively solicits feedback, and facilitates communication for multiple stakeholders",
      },
      {
        examples: [
          "Lead off-site workshop on interviewing\n",
          "Wrote Getaround's growth framework and rationale\n",
          "Aligned the entire organization around a meeting or process format\n",
        ],
        signals: [
          "Communicates project risk and tradeoffs skillfully and with nuance\n",
          "Contextualizes and clarifies ambiguous direction and strategy for others\n",
          "Negotiates resourcing compromises with other teams\n",
        ],
        summary:
          "Communicates complex ideas skillfully and with nuance, and establishes alignment within the wider organization",
      },
      {
        examples: [
          "Managed themes and speakers for half year check-in company offsite\n",
          "Created the communication plan for a substantial restructuring of team technical scopes\n",
          "Presented to the board about key company metrics and projects\n",
        ],
        signals: [
          "Defines processes for clear communication for the entire team\n",
          "Shares the right amount of information with the right people, at the right time\n",
          "Develops and delivers plans to execs, the board, or outside investors\n",
        ],
        summary:
          "Influences outcomes at the highest level, moves beyond mere broadcasting, and sets best practices for others",
      },
    ],
  },
  INITIATIVE: {
    description:
      "Challenges the status quo and effects positive organizational change outside of mandated work",
    displayName: "Initiative",
    id: "INITIATIVE",
    milestones: [
      {
        examples: [
          "Wrote about problems with a microservice that need to be addressed\n",
          "~~[draft] Wrote about content policy problems on Hatch~~\n",
          "Reported a site issue in Github\n",
        ],
        signals: [
          "Writes Slack posts about improvement opportunities\n",
          "Surfaces meaningful tensions in retrospectives\n",
          "Asks leadership team probing questions at all hands meetings\n",
        ],
        summary:
          "Identifies opportunities for organizational change or product improvements",
      },
      {
        examples: [
          "Advocated on own behalf for a change in role\n",
          "Researched and presented new data storage patterns to guild\n",
          "Audited web client performance in Chrome and proposed fixes\n",
        ],
        signals: [
          "Picks bugs off the backlog proactively when blocked elsewhere\n",
          "Makes design quality improvements unprompted\n",
          "Improves out-of-date or badly-organized documentation\n",
        ],
        summary:
          "Causes change to positively impact a few individuals or minor improvement to an existing product or service",
      },
      {
        examples: [
          "Defined style guide to resolve style arguments\n",
          "~~[draft] Proposed and implemented at-mentions prototype~~\n",
          "~~[draft] Implemented video for Android independently, unprompted~~\n",
        ],
        signals: [
          "Demonstrates concepts proactively with prototypes\n",
          "Fixes complicated bugs outside of regular domain\n",
          "Takes ownership of systems that nobody owns or wants\n",
        ],
        summary:
          "Causes change to positively impact an entire team or motivates a needed feature or service",
      },
      {
        examples: [
          "Created a rubric for better interviews\n",
          "Implemented and secured support for native login\n",
          "~~[draft] Migrated Getaround2 to mono repo and bazel~~\n",
        ],
        signals: [
          "Champions and pioneers new technologies to solve new classes of problem\n",
          "Exemplifies grit and determination in the face of persistent obstacles\n",
          "Instigates major new features, services, or architectures\n",
        ],
        summary:
          "Effects change that has a substantial positive impact on the engineering organization or a major product line",
      },
      {
        examples: [
          "~~[draft] Migrated the organization from Holacracy~~\n",
          "~~[draft] Built Getaround Android prototype and convinced execs to fund it~~\n",
          "Effectively convinced leadership and engineering org to move to a new architecture\n",
        ],
        signals: [
          "Creates a new function to solve systemic issues\n",
          "Galvanizes the entire company and garners buy in for a new strategy\n",
          "Changes complex organizational processes\n",
        ],
        summary:
          "Effects change that has a substantial positive impact on the whole company",
      },
    ],
  },
  MENTORSHIP: {
    description:
      "Provides support to colleagues, spreads knowledge, and develops the team outside formal reporting structures",
    displayName: "Mentorship",
    id: "MENTORSHIP",
    milestones: [
      {
        examples: [
          "Acted as an onboarding buddy\n",
          "Paired with an engineer to help them with an unfamiliar area\n",
          "Helped a colleague talk through some difficult feelings\n",
        ],
        signals: [
          "Makes themself available for informal support and advice\n",
          "Acts as sounding board for peers and more junior members\n",
          "Provides sound advice when asked\n",
        ],
        summary:
          "Informally mentors individuals in an ad-hoc way, supports new hires, and conveys institutional knowledge",
      },
      {
        examples: [
          "Improved documentation to explicitly make the onboarding experience better for the next eng hire\n",
          "Offered unprompted feedback to help growth, with empathy\n",
          "Lead from behind to support someone new to a leadership role\n",
        ],
        signals: [
          "Takes time to explain concepts and best practices\n",
          "Asks questions to illuminate concepts, rather than stating them\n",
          "Allows others to lead efforts when it will help their development\n",
        ],
        summary:
          "Mentors people proactively, and guides people to realizations rather than providing the answer",
      },
      {
        examples: [
          "Gave a brown bag/tech talk presentation on how to improve debugging skills\n",
          "Created a template for a new class of playbook entries for iOS-oncall\n",
          "Wrote Getaround onboarding content module\n",
        ],
        signals: [
          "Avoids siloing information when it can be usefully shared with others\n",
          "Works to increase the bus factor of systems\n",
          "Finds tools that work best for a team member's personality\n",
        ],
        summary:
          "Teaches small groups of engineers and contributes to Getaround's shared knowledge base",
      },
      {
        examples: [
          "Created and led Getaround's Women in Eng affinity group\n",
          "Organized an Eng All Hands with an outside speaker\n",
          "Designed and taught web client guild curriculum\n",
        ],
        signals: [
          "Defines an entire curriculum for a discipline\n",
          "Draws positive attention to well-modeled mentor and teaching behaviours\n",
          "Creates brown bag/tech talk series and lines up speakers\n",
        ],
        summary:
          "Encourages people to mentor each other, and creates ways for them to do so",
      },
      {
        examples: [
          "Instituted the professional education budget for engineers\n",
          "Mentored mentors\n",
          "Started the eng advisor program and lined up external mentors\n",
        ],
        signals: [
          "Sets incentive structures to recognise and reward mentorship\n",
          "Empowers team members to develop themselves\n",
          "Role models productive and healthy mentor relationships\n",
        ],
        summary:
          "Instills and promotes a culture of learning and development within the team",
      },
    ],
  },
  PROJECT_OWNERSHIP: {
    description:
      "Delivers well-scoped programs of work that meet their goals, on time, to budget, harmoniously",
    displayName: "Project Ownership",
    id: "PROJECT_OWNERSHIP",
    milestones: [
      {
        examples: [
          "Delivered a new feature within an existing app view, based on EDD\n",
          "Scoped and implemented a simple new GET endpoint\n",
          "~~[draft] Delivered payment history dashboard~~\n",
        ],
        signals: [
          "Estimates small tasks accurately\n",
          "Delivers tightly-scoped projects efficiently\n",
          "Writes effective technical specs outlining approach\n",
        ],
        summary: "Effectively delivers single tasks\n",
      },
      {
        examples: [
          "Wrote the EDD for a major phase of a long-running project\n",
          "Scoped and implemented an endpoint with a novel resource nesting scheme\n",
          "Added new library and introduced it to the guild\n",
        ],
        signals: [
          "Researches and effectively documents a technical decision between multiple alternatives\n",
          "Balances pragmatism and polish appropriately\n",
          "Defines and hits interim milestones\n",
        ],
        summary: "Effectively delivers individual projects\n",
      },
      {
        examples: [
          "Reduced variability of completion estimate by refactoring and frontloading risky project phases \n",
          "Completed launch checklist proactively for well-controlled rollout\n",
          "Facilitated project kickoff meeting to get buy-in\n",
        ],
        signals: [
          "Delegates tasks to others appropriately\n",
          "Integrates business needs into project planning\n",
          "Chooses appropriate project management strategy based on context\n",
        ],
        summary: "Effectively delivers projects through a team\n",
      },
      {
        examples: [
          "Oversaw technical delivery of a complex new tool, focusing on value by interfacing with two other departments\n",
          "Negotiatiated with marketing, legal, and appropriate functions to surface launch risks at project start\n",
          "Spent a small amount of time contributing comments to several EDDs per month, many notes saving those teams weeks or even months of effort\n",
        ],
        signals: [
          "Finds ways to deliver requested scope faster, and prioritizes backlog\n",
          "Manages dependencies on other projects and teams\n",
          "Develops new project management strategies and socializes them across teams\n",
        ],
        summary:
          "Effectively delivers complex projects through a large team, and positively influences project directions across many teams\n",
      },
      {
        examples: [
          "Coordinated cross department alignment & delivery of engineering project\n",
          "Delivered infrastructure migration requiring contributions from all guilds, on time\n",
          "Defined technical approach for the company's next strategic focus\n",
        ],
        signals: [
          "Considers external constraints and business objectives when planning\n",
          "Leads teams of teams, and coordinates effective cross-functional collaboration\n",
          "Owns a key company metric\n",
        ],
        summary: "Manages major company pushes delivered by multiple teams\n",
      },
    ],
  },
  QUALITY: {
    description:
      "Embodies and promotes practices to ensure excellent quality products and services",
    displayName: "Quality",
    id: "QUALITY",
    milestones: [
      {
        examples: [
          "Caught a bug before it went live\n",
          "Landed non-trivial PR with only style-related comments\n",
          "Wrote hermetic tests for the happy and sad cases\n",
        ],
        signals: [
          "Tests new code thoroughly, both locally, and in production once shipped\n",
          "Writes tests for every new feature and bug fix\n",
          "Writes clear comments and documentation\n",
        ],
        summary: "Delivers consistently good quality work",
      },
      {
        examples: [
          "Requested tests for a PR when acting as reviewer\n",
          "Cleared a sticky set of Sentry errors\n",
          "",
        ],
        signals: [
          "Consistently writes readable, easily testable, performant code\n",
          "Adds tests for uncovered areas\n",
          "Deletes unnecessary code and deprecates proactively when safe to do so\n",
        ],
        summary:
          "Increases the robustness and reliability of codebases, and devotes time to polishing products and systems",
      },
      {
        examples: [
          "~~[draft] Improved PRB to run the same volume of tests faster~~\n",
          "Integrated linter and static analyzer for PRs\n",
          "~~[draft] Created fixture system for visual quality~~\n",
        ],
        signals: [
          "Implements systems that enable better testing\n",
          "Gives thoughtful code reviews as a domain expert\n",
          "Adds tooling to improve code quality\n",
        ],
        summary: "Improves others' ability to deliver great quality work",
      },
      {
        examples: [
          "Added code coverage reporting to iOS CI pipeline\n",
          "~~[draft] Iterated repeatedly to develop Getaround's underlines solution~~\n",
          "~~[draft] Defined and oversaw plan for closing Heartbleed vulnerability~~\n",
        ],
        signals: [
          "Builds systems so as to eliminate entire classes of programmer error\n",
          "Focuses the team on quality with regular reminders\n",
          "Coordinates on-call priorities and projects\n",
        ],
        summary:
          "Advocates for and models great quality with proactive actions, and tackles difficult and subtle system issues",
      },
      {
        examples: [
          "~~[draft] Negotiated resources for Fix-It week with exec team~~\n",
          "~~[draft] Instituted and ensured success of a 20% time policy~~\n",
          "~~[draft] Started The Watch~~\n",
        ],
        signals: [
          "Defines policies for the engineering org that encourage quality work\n",
          "Identifies and eliminates single points of failure throughout the organization\n",
          "Secures time and resources from execs to support great quality\n",
        ],
        summary:
          "Enables and encourages the entire organization to make quality a central part of the development process",
      },
    ],
  },
  WELLBEING: {
    description:
      "Supports the emotional well-being of group members in difficult times, and celebrates their successes",
    displayName: "Wellbeing",
    id: "WELLBEING",
    milestones: [
      {
        examples: [
          "Put themself in another's shoes to understand their perspective\n",
          "Checked in with colleague showing signs of burnout\n",
          "",
        ],
        signals: [
          "Applies the reasonable person principle to others\n",
          "Avoids blame and focuses on positive change\n",
          "Encouraged teammates to take enough vacation\n",
        ],
        summary:
          "Keeps confidences unless legally or morally obliged to do otherwise",
      },
      {
        examples: [
          "Highlighted connection between tedious events monitoring project with overall company goals\n",
          "Noted a team without a recent win and suggested some easy quick wins\n",
          "",
        ],
        signals: [
          "Validates ongoing work and sustains motivation\n",
          "Proposes solutions when teams get bogged down or lose momentum\n",
          "Coordinated a small celebration for a project launch\n",
        ],
        summary:
          "Sheds light on other experiences to build empathy and compassion",
      },
      {
        examples: [
          "Organized a workshop with guest speaker on Diversity, Engagement, & Inclusion (DEI)\n",
          "Reframed a problem as a challenge, instead of a barrier, when appropriate\n",
          "",
        ],
        signals: [
          "Maintains a pulse on individual and team morale\n",
          "Helps group members approach problems with curiosity\n",
          "Completed training on nonviolent communication\n",
        ],
        summary: "Trains group members to separate stimulus from response",
      },
      {
        examples: [
          "Encouraged group members to focus on what they can control\n",
          "Guided people through complex organizational change\n",
          "",
        ],
        signals: [
          "Grounds group member anxieties in reality\n",
          "Tracks team retention actively and proposes solutions to strengthen it\n",
          "Relieved org tension around product direction by providing extra context\n",
        ],
        summary:
          "Ensures team environments are safe and inclusive, proactively",
      },
      {
        examples: [
          "Challenged false narrative and redirected to compassion and empathy\n",
          "Cultivated and championed a culture of empathy within the entire team\n",
          "",
        ],
        signals: [
          "Works to reshape narratives from victimization to ownership\n",
          "Increases the psychological safety of the entire team\n",
          "Converted group member from a problem haver to a problem solver\n",
        ],
        summary:
          "Recognizes and highlights inspiring experiences when appropriate",
      },
    ],
  },
};

// export const fetchTracks = async function fetchTracks() {
//   // FORMAT OF DATA:
//   // {
//   //   TRACK_NAME: {
//   //     displayName: "TRACK_NAME",
//   //     category: "A",
//   //     description: "",
//   //     milestones: [
//   //       {
//   //         summary: "",
//   //         signals: ["", "", ""],
//   //         examples: ["", "", ""],
//   //       }
//   //     ]
//   //   },
//   // }

//   const results = await firebase
//     .database()
//     .ref("/tracks")
//     .once("value")
//     .then(function (snapshot) {
//       const tracks = snapshot.val();
//       return tracks;
//     });

//   tracks = results;
// };

export const trackIds: TrackId[] = Object.keys(tracks);

export const categoryIds: Set<string> = trackIds.reduce((set, trackId) => {
  set.add(tracks[trackId].category);
  return set;
}, new Set());

export const categoryPointsFromMilestoneMap = (milestoneMap: MilestoneMap) => {
  let pointsByCategory = new Map();
  trackIds.forEach((trackId) => {
    const milestone = milestoneMap[trackId];
    const categoryId = tracks[trackId].category;
    let currentPoints = pointsByCategory.get(categoryId) || 0;
    pointsByCategory.set(
      categoryId,
      currentPoints + milestoneToPoints(milestone)
    );
  });
  return Array.from(categoryIds.values()).map((categoryId) => {
    const points = pointsByCategory.get(categoryId);
    return { categoryId, points: pointsByCategory.get(categoryId) || 0 };
  });
};

export const totalPointsFromMilestoneMap = (
  milestoneMap: MilestoneMap
): number =>
  trackIds
    .map((trackId) => milestoneToPoints(milestoneMap[trackId]))
    .reduce((sum, addend) => sum + addend, 0);

export const categoryColorScale = d3
  .scaleOrdinal()
  .domain(categoryIds)
  .range(["#b01aa7", "#b01aa7", "#b01aa7", "#b01aa7"]);

export const titles = [
  { label: "Engineer I", minPoints: 0, maxPoints: 16 },
  { label: "Engineer II", minPoints: 17, maxPoints: 35 },
  { label: "Senior Engineer", minPoints: 36, maxPoints: 57 },
  { label: "Group Lead", minPoints: 36, maxPoints: 57 },
  { label: "Staff Engineer", minPoints: 58, maxPoints: 89 },
  { label: "Senior Group Lead", minPoints: 58, maxPoints: 89 },
  { label: "Principal Engineer", minPoints: 90 },
  { label: "Director of Engineering", minPoints: 90 },
];

export const eligibleTitles = (milestoneMap: MilestoneMap): string[] => {
  const totalPoints = totalPointsFromMilestoneMap(milestoneMap);

  return titles
    .filter(
      (title) =>
        (title.minPoints === undefined || totalPoints >= title.minPoints) &&
        (title.maxPoints === undefined || totalPoints <= title.maxPoints)
    )
    .map((title) => title.label);
};

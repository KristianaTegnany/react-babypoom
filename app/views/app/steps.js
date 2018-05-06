
let nameToPaths = [
  ["welcome",     "/:uuid"           ],
  ["game",        "/:uuid/game"      ],
  ["arrival",     "/:uuid/my-info"   ],
  ["trip",        "/:uuid/my-trip"   ],
  ["visitorbook", "/:uuid/guest-book"],
  ["gift",        "/:uuid/gifts"     ],
  ["souvenir",    "/:uuid/memories"  ]
];

export const NAMES_TO_PATHS = new Map(nameToPaths);
export const PATHS_TO_NAMES = new Map(nameToPaths.map(pair => pair.slice().reverse()));

export function rootPath({ availableSteps, bpoom }) {
  return (NAMES_TO_PATHS.get(availableSteps[0]) || '').replace(':uuid', bpoom.uuid);
}

export function curStep({ currentStep, availableSteps, bpoom }) {
  return _nextPrevStep(currentStep, availableSteps, bpoom, 0);
}

export function nextStep({ currentStep, availableSteps, bpoom }) {
  return _nextPrevStep(currentStep, availableSteps, bpoom, +1);
}

export function prevStep({ currentStep, availableSteps, bpoom }) {
  return _nextPrevStep(currentStep, availableSteps, bpoom, -1);
}

// private
function _nextPrevStep(currentStep, availableSteps, bpoom, dir) {
  let index = availableSteps.indexOf(currentStep) + dir;
  let found = index >= 0 && index < availableSteps.length;
  let name = found ? availableSteps[index] : '';
  let transition = `to_${found ? name : 'finish'}`;
  let path = (NAMES_TO_PATHS.get(name) || '').replace(':uuid', bpoom.uuid);
  return { found, index, name, transition, path };
}
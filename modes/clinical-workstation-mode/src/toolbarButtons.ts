// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
import type { Button, RunCommand } from '@ohif/core/types';
import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults, ToolbarService } from '@ohif/core';
import { EVENTS } from '@cornerstonejs/core';

const ReferenceLinesCommands: RunCommand = [
  {
    commandName: 'setSourceViewportForReferenceLinesTool',
    context: 'CORNERSTONE',
  },
  {
    commandName: 'setToolActive',
    commandOptions: {
      toolName: 'ReferenceLines',
    },
    context: 'CORNERSTONE',
  },
];
const { windowLevelPresets } = defaults;
const toolGroupIds = ['default', 'mpr', 'SRToolGroup'];
const IMAGE_SLICE_SYNC_NAME = 'IMAGE_SLICE_SYNC';
const IMAGE_VOI_SYNC_NAME = 'IMAGE_VOI_SYNC';
const IMAGE_ZOOMPAN_SYNC_NAME = "IMAGE_ZOOMPAN_SYNC";

const IMAGE_SLICE_SYNC_OPTION =
{
    type: 'stackimage',
    id: IMAGE_SLICE_SYNC_NAME,
    source: true,
    target: true,
  };
  const IMAGE_VOI_SYNC_OPTION =
{
    type: 'voi',
    id: IMAGE_VOI_SYNC_NAME,
    source: true,
    target: true,
  };
  const IMAGE_ZOOMPAN_SYNC_OPTION =
  {
      type: 'zoompan',
      id: IMAGE_ZOOMPAN_SYNC_NAME,
      source: true,
      target: true,
    };

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [
      {
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset],
        },
        context: 'CORNERSTONE',
      },
    ],
  };
}

/**
 * Creates an array of 'setToolActive' commands for the given toolName - one for
 * each toolGroupId specified in toolGroupIds.
 * @param {string} toolName
 * @returns {Array} an array of 'setToolActive' commands
 */
function _createSetToolActiveCommands(toolName) {
  const temp = toolGroupIds.map(toolGroupId => ({
    commandName: 'setToolActive',
    commandOptions: {
      toolGroupId,
      toolName,
    },
    context: 'CORNERSTONE',
  }));
  return temp;
}

const toolbarButtons: Button[] = [
  // Measurement
  {
    id: 'MeasurementTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'MeasurementTools',
      isRadio: true, // ?
      // Switch?
      primary: ToolbarService._createToolButton(
        'Length',
        'tool-length',
        'Length',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'Length',
            },
            context: 'CORNERSTONE',
          },
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'SRLength',
              toolGroupId: 'SRToolGroup',
            },
            // we can use the setToolActive command for this from Cornerstone commandsModule
            context: 'CORNERSTONE',
          },
        ],
        'Length'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Measure Tools',
      },
      items: [
        ToolbarService._createToggleButton(
          'ReferenceLines',
          'tool-referenceLines', // change this with the new icon
          'Reference Lines',
          ReferenceLinesCommands,
          'Show Reference Lines',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
              [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
            },
          }
        ),
        ToolbarService._createToolButton(
          'Length',
          'tool-length',
          'Length',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Length',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRLength',
                toolGroupId: 'SRToolGroup',
              },
              // we can use the setToolActive command for this from Cornerstone commandsModule
              context: 'CORNERSTONE',
            },
          ],
          'Length Tool'
        ),
        ToolbarService._createToolButton(
          'Bidirectional',
          'tool-bidirectional',
          'Bidirectional',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Bidirectional',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRBidirectional',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Bidirectional Tool'
        ),
        ToolbarService._createToolButton(
          'ArrowAnnotate',
          'tool-annotate',
          'Annotation',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ArrowAnnotate',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRArrowAnnotate',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Arrow Annotate'
        ),
        ToolbarService._createToolButton(
          'EllipticalROI',
          'tool-elipse',
          'Ellipse',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'EllipticalROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SREllipticalROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Ellipse Tool'
        ),
        ToolbarService._createToolButton(
          'CircleROI',
          'tool-circle',
          'Circle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CircleROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRCircleROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Circle Tool'
        ),
        ToolbarService._createToolButton(
          'Angle',
          'tool-angle',
          'Angle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Angle',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRAngle',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Angle'
        ),
        ToolbarService._createToolButton(
          'Rectangle',
          'tool-rectangle',
          'Rectangle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'RectangleROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRRectangleROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Rectangle'
        ),
      ],
    },
  },
  // ReferenceLines + ImageSliceSync
  {
    id: 'ReferenceLinesAndSyncTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'ReferenceLinesAndSyncTools',
      isRadio: true, // ?
      // Switch?
      primary: ToolbarService._createToggleButton(
        'ReferenceLines',
        'tool-referenceLines', // change this with the new icon
        'Reference Lines',
        ReferenceLinesCommands,
        'Show Reference Lines',
        {
          listeners: {
            [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
            // [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
          },
        }
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: '定位线和图像同步',
      },
      items: [
        ToolbarService._createToggleButton(
          'ReferenceLines',
          'tool-referenceLines', // change this with the new icon
          'Reference Lines',
          ReferenceLinesCommands,
          'Show Reference Lines',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
              // [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
            },
          }
        ),
        ToolbarService._createToggleButton(
          'ImageSliceSync',
          'link',
          '同步切片位置',
          [
            {
              commandName: 'toggleImageSliceSync',
              commandOptions: { syncType: IMAGE_SLICE_SYNC_NAME, option: IMAGE_SLICE_SYNC_OPTION,toggledState: true },
            },
          ],
          'Enable position synchronization on stack viewports',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
                commandName: 'toggleImageSliceSync',
                commandOptions: { syncType: IMAGE_SLICE_SYNC_NAME, option: IMAGE_SLICE_SYNC_OPTION,toggledState: true },
              },
            },
          }
        ),
        ToolbarService._createToggleButton(
          'ImageVOISync',
          'link',
          '同步设置窗宽窗位',
          [
            {
              commandName: 'toggleImageSliceSync',
              commandOptions: { syncType: IMAGE_VOI_SYNC_NAME, option: IMAGE_VOI_SYNC_OPTION,toggledState: true },
            },
          ],
          'Enable position synchronization on stack viewports',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
                commandName: 'toggleImageSliceSync',
                commandOptions: { syncType: IMAGE_VOI_SYNC_NAME, option: IMAGE_VOI_SYNC_OPTION,toggledState: true },
              },
            },
          }
        ),
        ToolbarService._createToggleButton(
          'ImageZommPanSync',
          'link',
          '同步设置移动放大',
          [
            {
              commandName: 'toggleImageSliceSync',
              commandOptions: { syncType: IMAGE_ZOOMPAN_SYNC_NAME, option: IMAGE_ZOOMPAN_SYNC_OPTION,toggledState: true },
            },
          ],
          'Enable position synchronization on stack viewports',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
                commandName: 'toggleImageSliceSync',
                commandOptions: { syncType: IMAGE_ZOOMPAN_SYNC_NAME, option: IMAGE_ZOOMPAN_SYNC_OPTION,toggledState: true },
              },
            },
          }
        ),
      ],
    },
  },
  // Zoom..
  {
    id: 'Zoom',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: _createSetToolActiveCommands('Zoom'),
    },
  },
  // Magnify
  {
    id: 'Magnify',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-magnify',
      label: 'Magnify',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Magnify',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Window Level + Presets...
  {
    id: 'WindowLevel',
    type: 'ohif.splitButton',
    props: {
      groupId: 'WindowLevel',
      primary: ToolbarService._createToolButton(
        'WindowLevel',
        'tool-window-level',
        'Window Level',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel',
            },
            context: 'CORNERSTONE',
          },
        ],
        'Window Level'
      ),
      secondary: {
        icon: 'chevron-down',
        label: 'W/L Manual',
        isActive: true,
        tooltip: 'W/L Presets',
      },
      isAction: true, // ?
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(1, 'Soft tissue', '400 / 40'),
        _createWwwcPreset(2, 'Lung', '1500 / -600'),
        _createWwwcPreset(3, 'Liver', '150 / 90'),
        _createWwwcPreset(4, 'Bone', '2500 / 480'),
        _createWwwcPreset(5, 'Brain', '80 / 40'),
      ],
    },
  },
  // Zoom + Magnify
  {
    id: 'ZoomTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'ZoomTools',
      isRadio: true,
      primary: ToolbarService._createToolButton(
        'Zoom',
        'tool-zoom',
        'Zoom',
        _createSetToolActiveCommands('Zoom'),
        'Zoom'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: '更多放大工具',
      },
      items: [
        ToolbarService._createToolButton(
          'Zoom',
          'tool-zoom',
          'Zoom',
          _createSetToolActiveCommands('Zoom'),
          'Zoom'
        ),
        ToolbarService._createToolButton(
          'Magnify',
          'tool-magnify',
          'Magnify',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Magnify',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Magnify'
        ),
      ],
    },
  },
  // Pan...
  {
    id: 'Pan',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-move',
      label: 'Pan',
      commands: _createSetToolActiveCommands('Pan'),
    },
  },
  // Capture...
  {
    id: 'Capture',
    type: 'ohif.action',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      type: 'action',
      commands: [
        {
          commandName: 'showDownloadViewportModal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Layout..
  {
    id: 'Layout',
    type: 'ohif.layoutSelector',
    props: {
      rows: 5,
      columns: 5,
    },
  },
  // MPR
  {
    id: 'MPR',
    type: 'ohif.action',
    props: {
      type: 'toggle',
      icon: 'icon-mpr',
      label: 'MPR',
      commands: [
        {
          commandName: 'toggleHangingProtocol',
          commandOptions: {
            protocolId: 'mpr',
          },
          context: 'DEFAULT',
        },
      ],
    },
  },
  // Crosshairs
  {
    id: 'Crosshairs',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Crosshairs',
            toolGroupId: 'mpr',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Reset
  {
    id: 'Reset',
    type: 'ohif.radioGroup',
    props: {
      type: 'action',
      icon: 'tool-reset',
      label: 'Reset View',
      commands: [
        {
          commandName: 'resetViewport',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // rotate-right
  {
    id: 'rotate-right',
    type: 'ohif.radioGroup',
    props: {
      type: 'action',
      icon: 'tool-rotate-right',
      label: 'Rotate Right',
      commands: [
        {
          commandName: 'rotateViewportCW',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // flip-horizontal
  {
    id: 'flip-horizontal',
    type: 'ohif.radioGroup',
    props: {
      type: 'action',
      icon: 'tool-flip-horizontal',
      label: 'Flip Horizontally',
      commands: [
        {
          commandName: 'flipViewportHorizontal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // rotate-right + flip-horizontal
  {
    id: 'RotateTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'RotateTools',
      isRadio: true,
      primary: ToolbarService._createActionButton(
        'rotate-right',
        'tool-rotate-right',
        'Rotate Right',
        [
          {
            commandName: 'rotateViewportCW',
            commandOptions: {},
            context: 'CORNERSTONE',
          },
        ],
        'Rotate +90'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: '更多翻转工具',
      },
      items: [
        ToolbarService._createActionButton(
          'rotate-right',
          'tool-rotate-right',
          'Rotate Right',
          [
            {
              commandName: 'rotateViewportCW',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Rotate +90'
        ),
        ToolbarService._createActionButton(
          'flip-horizontal',
          'tool-flip-horizontal',
          'Flip Horizontally',
          [
            {
              commandName: 'flipViewportHorizontal',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Flip Horizontal'
        ),
      ],
    },
  },
  // ImageSliceSync
  // {
  //   id: 'ImageSliceSync',
  //   type: 'ohif.radioGroup',
  //   props: {
  //     type: 'toggle',
  //     icon: 'link',
  //     label: '图像切片同步',
  //     commands: [
  //       {
  //         commandName: 'toggleImageSliceSync',
  //       },
  //     ],
  //     tooltip: 'Enable position synchronization on stack viewports',
  //     extraOptions: {
  //       listeners: {
  //         [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
  //           commandName: 'toggleImageSliceSync',
  //           commandOptions: { toggledState: true },
  //         },
  //         isActive: true,
  //       },
  //     },
  //   },
  // },
  // ReferenceLines
  // {
  //   id: 'ReferenceLines',
  //   type: 'ohif.radioGroup',
  //   props: {
  //     type: 'toggle',
  //     icon: 'tool-referenceLines',
  //     label: 'Reference Lines',
  //     commands: ReferenceLinesCommands,
  //     extraOptions: {
  //       listeners: {
  //         [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
  //         [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
  //       },
  //     },
  //   },
  // },
  // ImageOverlayViewer 暂时存在问题  点击无作用
  {
    id: 'ImageOverlayViewer',
    type: 'ohif.radioGroup',
    props: {
      type: 'toggle',
      icon: 'toggle-dicom-overlay',
      label: '标签隐藏',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'ImageOverlayViewer',
          },
          context: 'CORNERSTONE',
        },
      ],
      extraOptions: { isActive: true },
    },
  },
  // StackScroll
  {
    id: 'StackScroll',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-stack-scroll',
      label: '滑动切换',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'StackScroll',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // invert
  {
    id: 'invert',
    type: 'ohif.radioGroup',
    props: {
      type: 'action',
      icon: 'tool-invert',
      label: 'Invert',
      commands: [
        {
          commandName: 'invertViewport',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Probe
  {
    id: 'Probe',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-probe',
      label: 'Probe',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'DragProbe',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // cine
  {
    id: 'cine',
    type: 'ohif.radioGroup',
    props: {
      type: 'toggle',
      icon: 'tool-cine',
      label: 'Cine',
      commands: [
        {
          commandName: 'toggleCine',
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // CalibrationLine
  {
    id: 'CalibrationLine',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-calibration',
      label: 'Calibration',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'CalibrationLine',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // TagBrowser
  {
    id: 'TagBrowser',
    type: 'ohif.radioGroup',
    props: {
      type: 'action',
      icon: 'list-bullets',
      label: 'Dicom标签',
      commands: [
        {
          commandName: 'openDICOMTagViewer',
          commandOptions: {},
          context: 'DEFAULT',
        },
      ],
    },
  },
  // More...
];

export default toolbarButtons;

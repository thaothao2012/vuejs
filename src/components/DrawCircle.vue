<template>
  <div class="hello" style="margin-top: 20px">
    <MainFrame>
      <Commands>
        <Button v-bind:disabled="!undoable" v-on:click="handleUndo">Undo</Button>
        <Button v-bind:disabled="!redoable" v-on:click="handleRedo">Redo</Button>
      </Commands>
      <CirclesFrame>
        <svg
          ref="svg"
          v-on:click="handleClick($event)"
          style="height: 100%;width: 100%;"
          @mousemove="handleMouseMove($event)"
        >
          <!-- v-for="item in handleSortedCircles" -->
          <ItemCircle
            v-for="item in circlesById"
            :key="item.id"
            :cx="item.x"
            :cy="item.y"
            :r="item.r"
            v-bind:hovered="id === hoveredCircleId"
            @mouseover="true"
          ></ItemCircle>
        </svg>
      </CirclesFrame>
      <ModalBackdrop v-on:click="close" v-if="selectedCircleId"/>
      <Modal v-model="undoable" v-if="selectedCircleId" style="z-index: 10000">
        <Close v-on:click="close">X</Close>
        <p>Adjust radius of circle</p>
        <Input type="range" min="5" max="100" v-model="rSeleclted" @change="handleRadiusChange"/>
      </Modal>
    </MainFrame>
  </div>
</template>

<script>
import ItemCircle from "./Circle";
import Button from "../shared/Button";
import Input from "../shared/Input";
import MainFrame from "../shared/MainFrame";
import ModalBackdrop from "../shared/ModalBackdrop";
import CirclesFrame from "../shared/CirclesFrame";
import Close from "../shared/Close";
import Commands from "../shared/Commands";
import Modal from "../shared/Modal";
import { filter, minBy } from "lodash";
// import ActionHistory from "./ActionHistory";

// const actionHistory = new ActionHistory();
const getDistance = p1 => p2 =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

let undoStack = [];
let redoStack = [];
export default {
  name: "DrawCircle",
  data: function() {
    return {
      circlesById: [],
      hoveredCircleId: null,
      selectedCircleId: null,
      undoable: false,
      redoable: false,
      nextId: 0,
      rSeleclted: 0,
    };
  },
  components: {
    ItemCircle,
    MainFrame,
    Commands,
    Button,
    CirclesFrame,
    Modal,
    Close,
    Input,
    ModalBackdrop
  },
  beforeDestroy: function() {
    this.unsubsribe();
  },
  methods: {
    handleUndo: function() {
      if (undoStack.length > 0) {
        const currentState = {
          circlesById: this.circlesById,
          undoable: this.undoable,
          redoable: this.redoable
        };
        redoStack.push(currentState);
        const state = undoStack.pop();
        this.circlesById = state.circlesById;
        this.undoable = (undoStack.length > 0) ? true : false;
        this.redoable = (redoStack.length > 0) ? true : false;
      }
    },
    handleRedo: function() {
      if(redoStack.length > 0) {
         const currentState = {
          circlesById: this.circlesById,
          undoable: this.undoable,
          redoable: this.redoable
        };
        undoStack.push(currentState);
        const state = redoStack.pop();
        this.circlesById = state.circlesById;
         this.undoable = (undoStack.length > 0) ? true : false;
        this.redoable = (redoStack.length > 0) ? true : false;
      }
    },
    addCircle: function({ x, y }) {
      // debugger;
      let tmp =[...this.circlesById];
      const currentState = {
        circlesById: this.circlesById,
        undoable: this.undoable,
        redoable: this.redoable
      };
      undoStack.push(currentState);
      const id = ++this.nextId;
      const newCircle = {
        id: id,
        x,
        y,
        r: 20
      };
      tmp.push(newCircle);
      this.circlesById = tmp;
      this.undoable = true;
      this.redoable = false;
    },
    open: function() {
      this.selectedCircleId = this.hoveredCircleId;
    },
    close: function() {
      this.selectedCircleId = null;
      this.hoveredCircleId = null;
    },
    getEventCoordinates: function(e) {
      const {
        left: svgLeft,
        top: svgTop
      } = this.$refs.svg.getBoundingClientRect();
      const { clientX: clickLeft, clientY: clickTop } = e;
      const x = Math.round(clickLeft - svgLeft);
      const y = Math.round(clickTop - svgTop);
      return { x, y };
    },
    handleClick: function(e) {
      /* eslint-disable no-debugger */
      // debugger;
      // this.selectedCircleId = this.hoveredCircleId;
      if (this.hoveredCircleId) this.open();
      else this.addCircle(this.getEventCoordinates(e));
    },
    handleMouseMove: function(e) {
      /* eslint-disable no-debugger */
      // debugger;
      const { x, y } = this.getEventCoordinates(e);
      const hoveredCircles = filter(this.circlesById, circle => {
        const distance = getDistance({ x, y })(circle);
        return distance < circle.r;
      });
      if (hoveredCircles.length === 0) return (this.hoveredCircleId = null);
      const closest = minBy(hoveredCircles, getDistance({ x, y }));
      this.hoveredCircleId = closest.id;
      this.rSeleclted = closest.r;
    },
    handleRadiusChange: function(e) {
      const tmp = JSON.parse(JSON.stringify(this.circlesById))
      const currentState = {
        circlesById: this.circlesById,
        undoable: this.undoable,
        redoable: this.redoable
      }; 
      undoStack.push(currentState);
      let tempId = this.selectedCircleId;
      tmp[--tempId].r = Number(e.target.value);
      this.circlesById = tmp;
      this.undoable = true;
      this.redoable = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>




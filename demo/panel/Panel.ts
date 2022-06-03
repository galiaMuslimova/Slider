import { IConfig, IOptions } from "../../src/interfaces/interfaces";
import Observer from "../../src/observer/Observer";
import IObserver from "../../src/observer/interface";
import Input from "../input/Input";
import IPanel from "./interface";

import "./panel.scss";

class Panel implements IPanel {
  public inputs: {};

  public observer: IObserver;

  readonly $root: JQuery<HTMLElement>;

  private options: IConfig;

  private $panel: JQuery<HTMLElement>;

  constructor($root: JQuery<HTMLElement>, options: IConfig) {
    this.$root = $root;
    this.options = options;
    this.observer = new Observer();
    this.$panel = $("<div>");
    this.inputs = {};
    this.initPanel(this.options);
    this.initBounds(this.options);
    this.bindEventListeners();
  }

  public setValue(options: IOptions): void {
    Object.entries(options).forEach(([key, value]) => {
      const input = this.inputs[key];
      input.setValue(value);
    });
  }

  static handlePanelFormSubmit(): boolean {
    return false;
  }

  private initPanel(options: IConfig): void {
    this.$panel = this.$root.find(".js-panel");
    const element = this;
    const inputs = {};
    Object.entries(options).forEach(([key, value]) => {
      const searcher = `${key}`;
      const $inputElement = this.$panel.find(`[name=${searcher}]`);
      const input = new Input($inputElement, key, value);
      input.observer.subscribe({
        key: "setting",
        observer: element.changeOptions.bind(element),
      });
      inputs[key] = input;
      if (key === "step") {
        input.setProp("min", 0.1);
        input.setProp("step", 0.1);
      }
    });
    this.inputs = inputs;
  }

  private initBounds(options: IOptions): void {
    Object.entries(options).forEach(([key, value]) => {
      this.changeBounds(key, value);
    });
  }

  private bindEventListeners(): void {
    this.$panel.on("submit", Panel.handlePanelFormSubmit);
  }

  private changeOptions(options: IOptions): void {
    Object.entries(options).forEach(([key, value]) => {
      this.changeBounds(key, value);
    });
    this.observer.notify("setting", options);
  }

  private changeBounds(key: string, value: number): void {
    const range =
      Number(this.inputs["max"].getValue()) -
      Number(this.inputs["min"].getValue());
    switch (key) {
      case "min":
        this.inputs["max"].setProp("min", value);
        this.inputs["step"].setProp("max", range);
        this.inputs["from"].setProp("min", value);
        break;
      case "max":
        this.inputs["min"].setProp("max", value);
        this.inputs["step"].setProp("max", range);
        this.inputs["from"].setProp(
          "max",
          this.inputs["range"].getValue() ? this.inputs["to"].getValue() : value
        );
        this.inputs["to"].setProp("max", value);
        break;
      case "step":
        this.inputs["from"].setProp("step", value);
        this.inputs["to"].setProp("step", value);
        break;
      case "from":
        this.inputs["to"].setProp("min", value);
        break;
      case "to":
        this.inputs["from"].setProp("max", value);
        break;
      case "range": {
        const max = value
          ? this.inputs["to"].getValue()
          : this.inputs["max"].getValue();
        this.inputs["to"].setProp("disabled", !value);
        this.inputs["from"].setProp("max", max);
        break;
      }
      case "vertical":
      case "tip":
        break;
      default:
        throw new Error("undefined setting");
    }
  }
}

export default Panel;

export const settingsTemplate = `<div class="settings">
      <form>
        <label>
          <p>min</p>
          <input class="settings__input" type="number" name="min" value="0" />
        </label>
      </form>
      <form>
        <label>
          <p>max</p>
          <input class="settings__input" type="number" name="max" value="50" />
        </label>
      </form>
      <form>
        <label>
          <p>step</p>
          <input class="settings__input" type="number" name="step" value="5" />
        </label>
      </form>
      <form>
        <label>
          <p>from</p>
          <input class="settings__input" type="number" name="from" value="10" />
        </label>
      </form>
      <form>
        <label>
          <p>to</p>
          <input class="settings__input" type="number" name="to" value="40" />
        </label>
      </form>
      <div class="settings__button">
        <div class="button">
          <input type="checkbox" class="button__checkbox">
          <div class="button__knobs"></div>
          <div class="button__layer"></div>
        </div>
      </div>
    </div>`
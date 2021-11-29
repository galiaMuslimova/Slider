export const settingsTemplate = `<div class="meta-slider__settings settings">
      <form>
        <label>
          <p>start</p>
          <input class="settings__input" type="number" name="start" value="0" />
        </label>
      </form>
      <form>
        <label>
          <p>end</p>
          <input class="settings__input" type="number" name="end" value="50" />
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
      <form>
        <label>
          <input type="radio" name="orientation" value="horizontal">
          horizontal
        </label>
        <label>
          <input type="radio" name="orientation" value="vertical">
          vertical
        </label>
      </form>
    </div>`
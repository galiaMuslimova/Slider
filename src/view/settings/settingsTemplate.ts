export const settingsTemplate = `<div class="meta-slider__settings">
      <form>
        <label class="number">
          <p class="text number__text">min</p>
          <input class="box number__input" type="number" name="min" value="0" />
        </label>
      </form>
      <form>
        <label class="number">
          <p class="text number__text">max</p>
          <input class="box number__input" type="number" name="max" value="50" />
        </label>
      </form>
      <form>
        <label class="number">
          <p class="text number__text">step</p>
          <input class="box number__input" type="number" name="step" value="5" />
        </label>
      </form>
      <form>
        <label class="number">
          <p class="text number__text">from</p>
          <input class="box number__input" type="number" name="from" value="10" />
        </label>
      </form>
      <form>
        <label class="number">
          <p class="text number__text">to</p>
          <input class="box number__input" type="number" name="to" value="40" />
        </label>
      </form>
      <form>
        <label class="toggle">
          <p class="text toggle__text">vertical</p>
          <input class="toggle__input" type="checkbox" name="vertical">
          <span class="box toggle__box"></span>          
        </label> 
      </form>
      <form>
        <label class="toggle">
          <p class="text toggle__text">tip</p>
          <input class="toggle__input" type="checkbox" name="tip">
          <span class="box toggle__box"></span>          
        </label>        
      </form>
      <form>
        <label class="toggle">
          <p class="text toggle__text">range</p>
          <input class="toggle__input" type="checkbox" name="range">
          <span class="box toggle__box"></span>          
        </label>        
      </form>
    </div>`
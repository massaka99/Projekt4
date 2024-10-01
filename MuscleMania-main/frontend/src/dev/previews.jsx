import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import StepOne from "../components/IntroSurvey/StepOne";
import StepThree from "../components/IntroSurvey/StepThree";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/StepOne">
        <StepOne />
      </ComponentPreview>
      <ComponentPreview path="/ComponentPreviews">
        <ComponentPreviews />
      </ComponentPreview>
      <ComponentPreview path="/StepThree">
        <StepThree />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;

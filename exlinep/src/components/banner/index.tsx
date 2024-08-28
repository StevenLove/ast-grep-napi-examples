import { useCallback, memo } from "react";
import styled from "styled-components";
import { WORKER_RESUME_PAGE } from "router";
import { Button } from "@vkontakte/vkui";

interface BannerInterface {
  handleClose: (toogle: boolean) => void;
}

function Banner({ handleClose }: BannerInterface) {
  const router = useRouter();

  const handleCloseBanner = useCallback(() => {
    handleClose(false);
    const resumeBannerClose = localStorage.getItem("resumeBannerClose");
    if (resumeBannerClose) {
      return;
    }
    localStorage.setItem("resumeBannerClose", "1");
  }, [handleClose]);

  return (
    <WrapperBanner>
      <Wrapper>
        <Description>
          <Title>Got experience but no resume?</Title>
          <SubTitle>Use all the features of the service and create a resume to find a job sooner rather than later</SubTitle>
        </Description>
        <Button appearance="neutral" mode="primary" size="s" onClick={() => router.pushPage(WORKER_RESUME_PAGE)}>
          Create
        </Button>
      </Wrapper>
      <Icon24DismissDark style={{ cursor: "pointer" }} onClick={handleCloseBanner} />
    </WrapperBanner>
  );
}

const WrapperBanner = styled("div")`
  background-color: var(--vkui--color_text_link_tint--active);
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

const Description = styled("div")`
  max-width: 270px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled("div")`
  color: var(--vkui--color_background_content);
  font-size: 16px;
  font-weight: semibold;
`;

const SubTitle = styled("div")`
  color: #d2e3f8;
  font-size: 13px;
`;

export default memo(Banner);
import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #0085ff;
  border-radius: 8px;
  padding: 1rem;
  gap: 0.5rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;

export const TitleHeader = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProviderName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export const DomainName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #a3aeba;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
`;

export const ContainerCreate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditCheContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .ql-container.ql-snow {
    max-height: 232px;
  }

  .ql-editor {
    z-index: 9999;
  }
`;

export const RowStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ColStyle = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
`;

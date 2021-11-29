import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Lottie } from '@components/Lottie'

import popsicle from '@lotties/popsicle.lottie.json'

const StyledTracks = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 48px;
  padding: 192px 48px;
  padding-bottom: 0;
  background-color: ${(p) => p.theme.color.section.tracks.bg};
  color: ${(p) => p.theme.color.section.tracks.fg};

  grid-template-areas:
    '. title .'
    'dancerA content dancerB'
    'dancerA . dancerB';

  @media (max-width: 1024px) {
    padding: 48px 16px;
    padding-bottom: 0;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    grid-template-areas:
      'title title'
      'content content'
      'dancerA dancerB';
  }
`

const Title = styled(Text.Heading1)`
  grid-area: title;
  position: relative;
  max-width: 700px;
  text-align: center;
  justify-self: center;
`

const Content = styled.div`
  grid-area: content;
  position: relative;
  max-width: 700px;
  padding-bottom: 192px;
  text-align: center;
  justify-self: center;

  @media (max-width: 1024px) {
    padding-bottom: 0;
  }
`

const DancerA = styled(Lottie)`
  grid-area: dancerA;
  margin-top: auto;
`

const DancerB = styled(Lottie)`
  grid-area: dancerB;
  margin-top: auto;
  justify-self: end;
`

export const Tracks = ({ section, ...restProps }) => {
  return (
    <StyledTracks {...restProps}>
      <Title>{section?.title}</Title>
      <Content>
        TODO: tracks
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          videbimus. Qui non moveatur et offensione turpitudinis et
          comprobatione honestatis? Quis istum dolorem timet? Terram, mihi
          crede, ea lanx et maria deprimet. Bonum negas esse divitias,
          praeposìtum esse dicis? Tum Piso: Atqui, Cicero, inquit, ista studia,
          si ad imitandos summos viros spectant, ingeniosorum sunt;
        </p>
        <p>
          Duo enim genera quae erant, fecit tria. Videamus animi partes, quarum
          est conspectus illustrior; Quamquam te quidem video minime esse
          deterritum. Aperiendum est igitur, quid sit voluptas; Nobis aliter
          videtur, recte secusne, postea; Hoc Hieronymus summum bonum esse
          dixit. Terram, mihi crede, ea lanx et maria deprimet. At modo dixeras
          nihil in istis rebus esse, quod interesset. Quae fere omnia
          appellantur uno ingenii nomine, easque virtutes qui habent, ingeniosi
          vocantur.
        </p>
        <p>
          Duo Reges: constructio interrete. Si quicquam extra virtutem habeatur
          in bonis. Tanta vis admonitionis inest in locis; Eam stabilem
          appellas. Igitur ne dolorem quidem. Itaque contra est, ac dicitis;
          Quae qui non vident, nihil umquam magnum ac cognitione dignum
          amaverunt.
        </p>
      </Content>
      {/* <Dancers>
        <div />
        <Lottie animationData={popsicle} />
      </Dancers> */}

      <DancerA animationData={popsicle} animationOffset={500} />
      <DancerB animationData={popsicle} />
    </StyledTracks>
  )
}

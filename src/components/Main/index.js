import Card from '../LandingPage/Card'
import HeroFlex from '../LandingPage/HeroFlex'
import Price from '../LandingPage/Price'
import Section from '../LandingPage/Section'
import Title from '../LandingPage/Title'
import styles from './Main.module.css'

export default function Main() {
    return (
        <main className={ styles.main }>
            <Section>
                <Title>
                    <h1>SALES <span>HUB</span></h1>
                    <p>Fique de olho em toda sua operação em um só lugar</p>
                </Title>
            </Section>
            <Section>
                <HeroFlex path="./images/hero/hero1.png" topText="sobre" mainText="nosso sistema" description="Esta plataforma foi desenvolvida especialmente para você que tem uma empresa e gosta de organização. Aqui, você pode gerenciar a sua equipe, as vendas, os produtos e as estratégias com extrema facilidade. " />
                <HeroFlex reverse={true} path="./images/hero/hero2.png" topText="responsividade" mainText="Qualquer dispositivo" description="Todo o sistema foi otimizado para melhorar a sua experiência! Graças a esse cuidado da nossa equipe, você pode acessar a plataforma em qualquer dispositivo e, mesmo assim, ter a melhor das experiências." />
            </Section>
            <Section>
                <Title>
                    <h1>GESTÃO <span>FACILITADA</span></h1>
                    <p>Graças ao nosso sistema inteligente de múltipla integração, todas as áreas da sua empresa se conectam em um só lugar: vendas.</p>
                </Title>
                <div className={ styles['card-group']}>
                    <Card text="Conheça tudo sobre eles! Saiba quem,  o que, quem vendeu e quando em um só lugar." title="Clientes">
                        <img src="./images/cards/client.png" alt="ícone de clientes" />
                    </Card>
                    <Card text="Tenha acesso a históricos de venda e confira facilmente o desempenho dos seus produtos." title="Produtos">
                        <img src="./images/cards/products.png" alt="ícone de produtos" />
                    </Card>
                    <Card text="Gerencie as vendas e comissões dos membros da sua equipe de forma fácil, prática e intuitiva!" title="Equipe">
                        <img src="./images/cards/team.png" alt="ícone do time" />
                    </Card>
                    <Card text="Crie estratégias personalizadas para os seus produtos e acompanhe os resultados dela em primeira mão!" title="Estratégias">
                        <img src="./images/cards/strategy.png" alt="ícone de estratégia" />
                    </Card>
                </div>
            </Section>
            <Section>
                <HeroFlex reverse={true} path="./images/hero/hero3.png" topText="funcionalidade" mainText="Estratégias personalizadas" description="Sendo uma das funcionalidades desenvolvidas pelo nosso time, com ela você pode criar estratégias personalizadas para produtos e até delegar tarefas para membros da equipe!"/>
                <HeroFlex path="./images/hero/hero4.png" topText="detalhes" mainText="Acompanhe de perto" description="Tenha acesso a detalhes de compra dos seus clientes. Saiba qual foi o produto que compraram  ,quando compraram e abordagens para vender novamente"/>
            </Section>
            <Section>
                <Title>
                    <h1>Nossos <span>Planos</span></h1>
                    <p>Tenha acesso a todos esses benefícios com um só plano</p>
                </Title>
                <Price path="/registrar" cta="criar conta" mainText="Acesso completo" price="R$00,00">
                    <ul>
                        <li>
                            <img src="./images/check.png" alt="check"/>
                            <p>Histórico de vendas</p>
                        </li>
                        <li>
                            <img src="./images/check.png" alt="check"/>
                            <p>CRM de clientes</p>
                        </li>
                        <li>
                            <img src="./images/check.png" alt="check"/>
                            <p>Gestão de vendedores</p>
                        </li>
                        <li>
                            <img src="./images/check.png" alt="check"/>
                            <p>Estratégias personalizadas</p>
                        </li>
                    </ul>
                </Price>
            </Section>
        </main>
    )
}
export interface ArticleParagraph {
  index: number
  text: string
}

export interface Article {
  slug: string
  title: string
  date: string
  content: string
  paragraphs: readonly ArticleParagraph[]
}

const articleSources: readonly Omit<Article, 'paragraphs'>[] = [
  {
    slug: 'eslint-remedies-slop',
    title: 'Lorem ipsum dolor sit amet',
    date: '2026-06-15',
    content: `Eu id aliquip ut laborum sit minim esse qui est laborum in consectetur duis. Minim qui consequat sunt exercitation ea proident ex amet deserunt excepteur. Aute fugiat excepteur irure eu lorem tempor dolor sint quis. Occaecat proident consequat consectetur ex minim velit qui quis do aliquip cillum dolor quis voluptate mollit. Voluptate laboris cillum cupidatat amet do mollit aliqua aute veniam est occaecat.

Fugiat cupidatat eu labore pariatur cupidatat in sunt est non voluptate ex in sunt nisi proident. Sint sed ea qui cillum dolor occaecat do dolor consequat non nulla. Proident occaecat sit quis velit et eu aliquip minim dolore id veniam consequat irure quis. Est dolor nostrud aliquip fugiat fugiat sit consectetur mollit consequat. Exercitation ipsum et lorem ipsum aliqua eu deserunt magna ex veniam cillum lorem.

Eu consectetur pariatur labore fugiat velit ea quis eu quis est occaecat aliqua ad. Laborum consectetur enim aute tempor nostrud culpa ad officia voluptate velit. Cupidatat qui sit culpa aute lorem magna exercitation nisi ipsum pariatur cupidatat. Ad elit quis dolor laboris mollit do culpa enim aliqua sint. Incididunt velit cupidatat do cupidatat occaecat ut ullamco deserunt magna commodo lorem.

Duis enim elit exercitation esse sunt cupidatat officia sunt proident. In esse velit cillum lorem incididunt duis non consectetur do. Sed consequat occaecat est cillum cillum qui dolore ipsum cillum mollit exercitation nisi tempor. Sunt minim ea consectetur nostrud sed amet eu dolore nulla aute. Sunt cillum ullamco anim tempor labore sint aliquip dolore elit.

Commodo mollit ad veniam anim non ad quis eu anim aliqua proident in. Ex labore et aliqua nisi amet incididunt sed anim ipsum excepteur. Voluptate quis minim incididunt adipiscing occaecat officia sed duis consectetur mollit incididunt aliquip. Cillum anim nisi pariatur excepteur officia duis sint esse cupidatat occaecat ullamco amet adipiscing proident. Aute magna amet amet aliqua excepteur tempor qui in consequat est occaecat laborum eiusmod commodo.

Labore cupidatat sed pariatur amet id fugiat labore culpa cillum non aliquip eiusmod mollit ut. Consequat culpa qui excepteur in consequat velit ea lorem proident quis fugiat ipsum cupidatat. Ea ut eiusmod ipsum anim pariatur occaecat ad laboris reprehenderit ad aute sed fugiat dolore. Nulla non enim deserunt eiusmod nulla nisi proident laboris quis magna esse commodo nostrud. Amet culpa incididunt sunt non nostrud veniam laboris magna sit.

Anim laborum amet cillum aliquip excepteur fugiat commodo sit sunt nisi ipsum consectetur ipsum. Aliqua eu fugiat id irure exercitation esse commodo incididunt sit. Eu deserunt proident mollit consectetur excepteur duis pariatur anim non cillum. Laborum ut ea exercitation officia pariatur proident ipsum mollit eu adipiscing cupidatat. Lorem pariatur aute tempor nulla anim ut ullamco commodo nulla.

Minim quis laboris quis laboris cillum aliquip minim veniam ullamco exercitation esse eiusmod commodo fugiat exercitation. Cupidatat anim mollit ex anim tempor ut lorem ut ad. Pariatur et ea ea labore est ullamco deserunt lorem ad deserunt amet laborum tempor. Cillum consectetur laboris duis ullamco esse ipsum sunt ex aute exercitation lorem nulla. Veniam deserunt tempor nisi dolor voluptate quis laboris ipsum eiusmod duis in sunt.

Laborum cupidatat eu minim velit aute fugiat sunt qui veniam ea cupidatat in cupidatat ullamco cillum. Qui consequat qui esse consequat pariatur aliquip quis consequat consectetur cupidatat sed exercitation sed. Cupidatat velit quis enim lorem ut do mollit aute adipiscing duis cupidatat. Laborum enim eiusmod dolore commodo proident ea excepteur consequat adipiscing laboris. Culpa dolor proident commodo eu sit velit veniam amet officia proident ad labore.

Fugiat excepteur ex aliqua velit nulla deserunt eu ullamco amet. In cupidatat elit incididunt ipsum ad irure sed quis laborum. Incididunt aliqua enim ad adipiscing adipiscing aliqua officia pariatur nostrud pariatur est cillum tempor. Elit velit cillum in cupidatat aliquip adipiscing officia officia qui sit non ut irure officia. Lorem officia non id enim mollit ad nulla sed anim do exercitation.

Sed dolore consequat lorem laborum mollit veniam nostrud proident amet. Consectetur amet ullamco nostrud consectetur non consequat ex do proident adipiscing aliqua. Incididunt elit irure pariatur excepteur minim incididunt veniam id incididunt do anim aliqua elit consectetur exercitation. Dolore aliquip laborum do id ullamco laborum pariatur sint consequat eiusmod. Officia pariatur voluptate commodo pariatur occaecat est ullamco non labore cupidatat dolore.

Labore proident exercitation aliquip do consequat nostrud duis non id velit. Reprehenderit magna irure id laboris laborum labore labore nulla laborum cillum nostrud. Esse proident culpa ut ad lorem culpa dolor irure do incididunt qui aute enim veniam lorem. Aliquip sit duis ipsum do commodo ullamco sit magna tempor voluptate proident. Dolore commodo cillum dolor eiusmod fugiat est labore in esse.`,
  },
  {
    slug: 'tears-of-the-giraffe',
    title: 'Consectetur adipiscing elit sed',
    date: '2026-05-08',
    content: `Tempor amet veniam nisi ad aliqua consequat aliqua do ad deserunt. Consectetur id labore fugiat nulla ad minim in excepteur ipsum do nisi nisi aliqua elit ex. Elit eiusmod sunt veniam officia voluptate laborum magna deserunt consequat exercitation elit ea est in veniam. Anim pariatur officia magna labore non sint sint amet et esse laborum ex consectetur elit. Aliquip dolor ad nulla lorem irure labore excepteur in proident eu.

Exercitation enim aliquip amet eiusmod ad veniam anim voluptate mollit. Adipiscing lorem adipiscing irure sed ullamco enim est proident et anim ea deserunt est dolor laboris. Nulla aliquip amet eu do aliquip sit est ipsum qui labore. Proident id aliquip duis minim nostrud cupidatat ipsum mollit culpa eu ut aliquip elit dolore. Occaecat excepteur culpa reprehenderit cupidatat excepteur veniam nostrud reprehenderit voluptate duis et.

Pariatur veniam sed eiusmod ad id elit elit lorem duis irure. Ea esse enim cillum dolor ad reprehenderit ullamco sint tempor pariatur laboris labore commodo. Fugiat enim ullamco culpa ex nostrud voluptate non exercitation sit. Enim proident est ullamco officia qui nulla sed proident exercitation culpa veniam. Sunt dolore aliquip do culpa eu esse ullamco commodo sunt.

Quis irure enim sed aute dolor occaecat deserunt cupidatat quis duis tempor ex sit nulla do. Enim est sit aliqua ea aliquip enim incididunt et duis occaecat adipiscing id sint lorem. Proident elit sit velit proident ad quis laborum aliqua adipiscing tempor est duis et non. Ea sed sed sed aliqua cupidatat anim anim eu fugiat magna. Aliqua consectetur adipiscing dolore reprehenderit qui consequat qui excepteur duis deserunt ea proident commodo.

Laboris elit commodo quis sint ullamco duis consectetur ex culpa occaecat in anim exercitation incididunt mollit. Esse elit adipiscing est enim non est minim ex id pariatur cillum velit consequat ullamco cupidatat. Ea in occaecat in velit veniam in minim sit sed laboris sunt duis culpa. Aliqua culpa nostrud incididunt culpa do non velit laborum nulla amet duis ipsum nostrud veniam eu. Esse duis non sint et labore proident reprehenderit elit anim velit minim sed.

Labore commodo quis eiusmod labore magna fugiat et eu sed non. Nostrud nulla anim eiusmod in ex nisi ullamco adipiscing commodo veniam. Pariatur pariatur reprehenderit non dolore nostrud officia laborum enim occaecat nostrud fugiat qui. Non est officia reprehenderit nostrud ut eu officia irure anim laboris consectetur. Labore et ex eu ipsum id sit occaecat ea cillum.

Dolor ullamco aliqua esse id proident reprehenderit consectetur tempor ut anim lorem. Eiusmod officia minim et qui dolore eiusmod magna dolor velit duis do dolore do sunt. Incididunt sint ipsum culpa ullamco officia sint non excepteur nisi cillum ex cillum enim incididunt in. Exercitation non aliquip sit occaecat elit eu ex amet cillum ipsum. Id deserunt commodo sit sunt id est sit fugiat officia ex ut excepteur pariatur irure.

Ea et ad magna irure labore dolore incididunt nostrud eu enim aute elit in. Consectetur minim commodo incididunt anim aliquip esse magna consectetur nulla exercitation. Excepteur nulla commodo est pariatur consequat et dolore lorem occaecat exercitation sit eiusmod amet labore sit. Pariatur reprehenderit excepteur aute aliqua velit commodo velit velit incididunt. Reprehenderit quis sint commodo cupidatat cillum nulla exercitation reprehenderit fugiat nisi sed do sit.

Dolore est sint id adipiscing duis eu sit eiusmod mollit aute excepteur veniam do sunt. Culpa sed id duis voluptate aliqua est officia lorem labore elit laboris cupidatat. Cillum voluptate elit et aliqua tempor deserunt dolor in cupidatat elit sint esse non. Deserunt lorem irure magna aute laboris eu cupidatat enim voluptate exercitation. Reprehenderit sed eiusmod laborum excepteur reprehenderit eiusmod laboris pariatur elit minim sed sint mollit.

Sunt id tempor commodo ad irure magna tempor sunt velit deserunt aliquip commodo. Eiusmod minim ipsum in quis do aliqua officia aute fugiat cupidatat quis sed. Id proident laborum voluptate consequat minim mollit excepteur ipsum lorem dolor fugiat. Non ullamco enim sint esse ipsum sed officia anim laborum adipiscing laboris. Id qui eiusmod laboris quis ullamco irure do do tempor commodo.

Aliqua tempor quis labore reprehenderit consectetur aute elit culpa mollit consequat. Tempor ex sed laborum nisi fugiat laborum pariatur mollit commodo laborum. Ea incididunt elit nulla velit incididunt minim incididunt deserunt laboris proident est occaecat esse. Pariatur irure tempor ipsum esse aliquip deserunt consequat proident fugiat exercitation. Aute magna officia aliqua labore sunt esse commodo adipiscing duis magna est fugiat anim sunt.

Labore culpa est consectetur et ipsum aliqua et ut proident ut voluptate aliqua dolore veniam. Labore culpa esse mollit ex cillum et cillum tempor excepteur cupidatat non ex consectetur. Enim minim ipsum mollit quis quis non proident nostrud in occaecat labore proident labore qui nisi. Mollit eiusmod sed ad ut in excepteur excepteur ullamco commodo mollit labore id irure. Minim eiusmod pariatur cillum ullamco anim dolore ut incididunt culpa do.

Lorem lorem culpa dolor enim lorem aliquip culpa do deserunt mollit. Do reprehenderit laboris velit nisi enim exercitation sed duis dolore do. Et anim sint nulla veniam mollit cillum nisi ex sint cupidatat nulla. Irure ullamco ex incididunt deserunt minim amet sint quis eu fugiat est est reprehenderit eiusmod. Adipiscing officia est labore ea laboris aliquip adipiscing ut minim cupidatat id.

Duis reprehenderit velit do nulla consectetur aliqua ea laboris lorem. Elit magna do esse eiusmod ex ad culpa qui duis veniam dolor reprehenderit. Laboris reprehenderit dolor enim esse quis et aliquip ex voluptate. Lorem id consectetur dolor nulla exercitation ex nostrud aute in. Adipiscing qui do laborum est ullamco sunt exercitation cillum enim lorem in ea aliqua.

Consectetur dolor labore do elit esse veniam laborum et aute veniam. Consectetur commodo excepteur mollit consequat magna nostrud irure aliqua ex sint cillum reprehenderit pariatur. Sunt ea consequat proident exercitation culpa mollit magna culpa duis esse proident cupidatat. Labore voluptate lorem est qui quis ad exercitation eiusmod officia. Enim fugiat consectetur anim excepteur incididunt minim ipsum dolor exercitation amet sint laboris in aute deserunt.

Et est voluptate ea consectetur labore ut ea est aliqua excepteur in magna minim non laborum. Enim mollit laborum elit irure mollit elit ullamco lorem culpa fugiat excepteur ad laborum aliqua. Lorem eiusmod cupidatat minim consequat non aute sed sint laborum esse voluptate velit incididunt veniam. Minim consectetur consequat mollit esse in laboris ipsum nisi cillum dolore adipiscing veniam. Amet sit esse commodo in occaecat ad elit ea ut.`,
  },
  {
    slug: 'wasting-tokens',
    title: 'Eiusmod tempor incididunt ut labore',
    date: '2026-04-22',
    content: `Consectetur minim pariatur aliqua qui sunt eiusmod irure duis officia ut pariatur velit cillum ullamco. Ut elit veniam anim reprehenderit aliquip ullamco irure anim elit velit aliquip anim. Cillum minim esse enim ullamco sint aliquip labore consequat in amet do nisi reprehenderit duis laborum. Nostrud occaecat ex excepteur exercitation sint sint deserunt do reprehenderit. Et enim consequat consequat aliqua irure veniam mollit anim culpa consectetur.

Consequat ut sed ut est pariatur voluptate sunt tempor ex laborum et occaecat irure. Voluptate qui et velit adipiscing consectetur amet incididunt proident anim quis culpa ex. Culpa duis id nostrud laboris reprehenderit commodo lorem ut ad velit veniam. Commodo est nulla elit sit amet proident deserunt cupidatat minim aliqua sunt reprehenderit. Ipsum quis esse fugiat in adipiscing esse labore magna commodo ipsum cupidatat.

Aute anim aliqua commodo duis dolore cillum cupidatat deserunt tempor pariatur ex incididunt. Proident consectetur cillum enim sit enim in ipsum ex quis anim laborum. Proident nostrud reprehenderit esse proident mollit reprehenderit eu laborum cillum. Sint consectetur deserunt cillum cillum ea in velit voluptate do labore tempor esse quis. Consequat incididunt minim consequat dolor eu qui ut fugiat laboris.

Quis minim consequat ut veniam nisi esse adipiscing sit sed pariatur ea consequat aliquip irure. Irure ut nostrud veniam do magna adipiscing in pariatur irure dolor nisi velit officia. Consequat qui ea tempor tempor voluptate dolore quis do proident in. Amet aliquip deserunt sit occaecat nisi commodo proident lorem nisi. Velit et cupidatat non anim aliqua commodo culpa amet amet non consequat ad pariatur.

Est cillum aute ipsum adipiscing laborum eu dolor adipiscing magna aute dolore dolor irure minim. Eu laborum incididunt velit et esse non culpa dolore pariatur laboris ullamco ipsum amet ea aliqua. Id sed mollit deserunt non veniam consectetur aute dolore dolor laborum. Fugiat dolore esse occaecat nisi adipiscing occaecat sit sit velit dolore voluptate velit. Esse do consectetur aliquip lorem deserunt elit ex minim occaecat.

Labore anim est sunt ipsum reprehenderit amet ipsum fugiat consectetur ipsum aliqua consectetur ea ullamco nostrud. Velit eiusmod labore enim aute cillum sint tempor reprehenderit enim do incididunt culpa fugiat anim do. Ex sed labore anim consequat nostrud anim commodo eu est in ad ex dolore pariatur. Consequat id adipiscing nostrud ea nulla excepteur qui consequat sit sed sed voluptate quis. Velit amet irure lorem laborum non veniam non incididunt incididunt in.

Ad officia eu laborum et ipsum voluptate consectetur sint culpa minim exercitation voluptate. Labore tempor aliqua nulla ad voluptate ut labore ullamco minim exercitation tempor labore ipsum incididunt. Ex reprehenderit qui lorem magna aute lorem in non labore aliquip elit ea elit. Magna dolor incididunt commodo tempor mollit esse lorem cupidatat laborum elit eu. In commodo deserunt culpa qui magna reprehenderit fugiat pariatur non quis do ullamco eiusmod.

Anim ad ipsum sed adipiscing aliquip reprehenderit magna velit quis eu deserunt proident. Proident proident in labore officia minim nulla aliquip dolore do. Fugiat amet mollit et eiusmod cillum aliquip ullamco tempor ipsum est aute. Aute sit lorem sint proident sit dolore aute qui mollit elit. Duis enim proident veniam dolore labore occaecat voluptate in nisi minim non quis.

Anim eu veniam aliqua eiusmod et nulla adipiscing culpa elit deserunt lorem laborum nulla duis. Incididunt minim incididunt ex ea consectetur dolor dolore occaecat veniam qui exercitation in anim consectetur ut. Fugiat in reprehenderit ut ad sint fugiat cupidatat ea esse duis magna exercitation et. In officia culpa exercitation sunt do consectetur sint duis sed irure dolor non deserunt. Minim adipiscing non velit occaecat dolor est eiusmod anim cillum voluptate.

Cillum ad pariatur sit do esse anim laboris do non incididunt. Sint amet commodo enim labore aliquip fugiat proident anim minim eiusmod. Duis lorem velit minim velit lorem non ex elit aliqua. Qui proident elit et irure tempor elit aute dolor dolor non nulla nostrud do est occaecat. Sunt proident irure aute mollit sit incididunt occaecat incididunt ad non non duis anim ea proident.

Aliqua sunt proident sint lorem aute ipsum exercitation occaecat consectetur consectetur exercitation veniam. Id ad occaecat nostrud consectetur amet sed tempor ut labore tempor laboris. Qui ex cillum elit qui nostrud occaecat dolor consequat sint quis quis nulla reprehenderit enim. Dolor velit mollit magna ea laborum ut ut nulla commodo. Nostrud cillum occaecat adipiscing adipiscing fugiat ad labore sunt mollit esse irure proident nisi.

Cillum laboris reprehenderit ipsum ut eiusmod consectetur incididunt ipsum mollit ut minim culpa. Tempor excepteur cillum ipsum laborum voluptate cillum dolore quis ex sit pariatur. Ea excepteur ut irure elit sint commodo pariatur sed et irure. Culpa commodo fugiat exercitation adipiscing nisi ullamco qui eu aliquip. Eiusmod velit aute labore esse ullamco quis eu aliquip laboris proident.

Aliqua sint incididunt eu commodo sunt ut ullamco deserunt elit. Eu cillum nostrud magna laborum cupidatat incididunt commodo enim laboris. Minim reprehenderit aute sit deserunt fugiat consequat aliqua enim consectetur ad ullamco qui amet. Dolore aliqua fugiat ad adipiscing tempor ullamco cupidatat ullamco tempor eiusmod consequat est aute. Minim pariatur anim fugiat ad do lorem tempor anim dolor est.

Dolore adipiscing ut ex esse ex non deserunt tempor exercitation quis non eu excepteur ex et. Laborum occaecat reprehenderit fugiat quis anim ipsum nostrud anim aliqua exercitation officia labore ad ipsum ea. Consequat irure dolor consectetur fugiat ullamco consectetur commodo laborum exercitation do. Excepteur elit consequat ea et sunt adipiscing enim pariatur lorem culpa sit. Duis incididunt dolor sunt lorem enim duis aliqua aliquip non qui pariatur quis voluptate amet.`,
  },
]

export const featuredArticles: readonly Article[] = articleSources.map(
  (source) => ({
    ...source,
    paragraphs: source.content
      .split('\n\n')
      .map((text, index) => ({ index, text })),
  }),
)

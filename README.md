1. **INTRODUCTION**

  1. **OVERVIEW:**

The Healthcare system plays a significant role in the progress of a country. In Pakistan, especially in **i** ts rural areas,[2] healthcare system is not good enough to facilitate the rural population that is more than 60% of the total population of Pakistan [3] and one reason for this is the unavailability of specialist doctors. Almost half a million people die annually due to errors in diagnostics and medication in Pakistan [4]. Our aim is to develop an application (intelligent medical consultant) for doctors that will minimize diagnostics errors, especially in the rural reality of Pakistan.

**1.2**  **INTELLIGENT MEDICAL CONSULTANT:**

In this application, we are trying to mimic the process of diagnosis. In this diagnosis process, the doctor diagnoses a disease based on symptoms, and for that, he/she use bookish knowledge (deductive knowledge) and experience (Inductive knowledge). In this application, we will use the knowledge base of bookish data about diseases and their symptoms and doctors previous history of diagnosis. By using this inductive and deductive knowledge, our application will show the best possible results. We are terming our work as the computational model for approximating the abductive reasoning for medical diagnosis [1].

1. **Similar Apps:**

  1. **WebMd Symptom Checker:**

WebMD offers credible and in-depth medical news, features, reference material, and online community programs. We are proud that others in the fields of media and health have recognized our efforts over the years. WebMd also offers a powerful symptom checker in its health resources which it prides itself in. Powerful Features of its Symptom Checker are:

- Easy identification of symptom using 3D Body model: User can click the part of the body they are feeling sick in through that they can select the symptoms associated with that part.
- User friendly UI

Steps involved in gaining diagnosis:

1. Add Age and gender
2. Add Symptoms
3. Question for further filtering
4. Diagnosis
5. Details of each disease in diagnosis
6. Treatment.

  1. **Infermedica Symptomate:**

Infermedica adeptly interweaves medical and technical expertise. Our multi-disciplinary team creates AI-powered healthcare solutions that help doctors deliver efficient, safe, and reliable care to their patients. Symtomate symptom checker can provide diagnosis in 3 min to you or if you want to diagnose someone else. Prominent feature of this app are:

- Quick identification using 2D figure: User can click the part of the body they are feeling sick in through that they can select the symptoms associated with that part.
- User friendly UI

Steps involved in gaining diagnosis:

1. Select whether you are gonna diagnose yourself or someone else
2. Select gender
3. Add Age
4. Add Symptoms
5. Select Region using map
6. Interview(Some questions are asked)
7. Diagnosis
8. Details of each disease in diagnosis
9. Treatment

1. **Requirement Gathering and Analysis:**
  1. **Architectural And Design Requirements:**

![](RackMultipart20210225-4-1v6cbni_html_6f8766dbaa4a4f89.jpg)

| Use Case | Details |
| --- | --- |
| **Add Symptoms** | In this use case we describe how a doctor can add the symptoms diagnoses into the app for further processing.

 The doctor will see a search bar where he will be required to input the symptoms identified. The search bar should include the ability to auto complete the symptom being added. There should be an option of deleting symptoms added.

 The actors of this use case are the doctor and the server (data for auto completion). |
| --- | --- |
| **Degree of Match** | In this use case we describe how a server shows the results of the added symptoms.

 The doctor should see the names of the diseases that matches along with the percentage of the matching degree of the symptoms being diagnose with respect to disease own symptoms. The matching degree should be shown from 3 perspectives:
1. Deductive Knowledge Base
2. Inductive Knowledge Base
3. Circle of doctors.
The actor of this use case is the server. |
| **Make decision** | In this use case we describe how a doctor will represent his decision from the list of diseases.
The doctors will select a disease to see further details of the matched symptoms with respect to diseases own symptoms and make a decision for the selected disease whether to agree, disagree or add it to waiting queue to make decision later if the doctor is not sure at the moment.
The actors of this use case are the doctors and the server. |

1. **Features:**
  1. **Symptoms Adder:**
    - Auto completion from dataset stored in google cloud firestore.
    - Bubble shape symptoms representer with deletion feature on tap.
    - Symptom adder in both screen for faster adding.
  2. **Tabbed View:**
    - Tabbed View for showing diseases from multiple perspectives
  3. **On Click dialog(Modal):**
    - Clicking on disease opens up a popup with its symptoms.
  4. . **Progress Circle:**
    - To show the percentage of match with the disease.

1. **Project Structure And Architecture:**
  1. **Definition of Project:**

&quot;package.json&quot; is the definition of react-native projects. This is how it looks after setup is completed for a react-native app. Here is the final &#39;package.json&#39; snapshot:

![](RackMultipart20210225-4-1v6cbni_html_4818affca45c2612.jpg)

  1. **Structure**

**/App.js:**

- It is the default entry point of every react-native application.
- It is also the core application source code.
- It has Navigation Container and stack navigator to show how the Reactnative screen stacks will operate.

**/src/…** :

- All the resources generated by us for our application must reside within this directory.
- This will be the core source resource folder.

**Let&#39;s dive-in to the &#39;src&#39; folder to understand the rationale behind this structure:**

**/screens:**

- All screens that our app is capable of showing will be store here.

**/components:**

- This folder is used to add custom components for our app.

1. We have just one component which the modal(Modal.js) that pops up when a certain disease is selected

  1. **Database Schema:**

We have used **NoSQL Google cloud firestore** to store our data. The reason for using it is **NoSQL**  databases are built to be flexible, scalable, and capable of rapidly responding to the data management. And the reason behind choosing firestore rather than real-time database is that firestore can easily be queried, which is not possible in the case of realtime database. In firestore data is represent in this hierarchy:

collection

 ![](RackMultipart20210225-4-1v6cbni_html_3937a442d0e08ba1.gif)

fields

document


 ![](RackMultipart20210225-4-1v6cbni_html_7bd31716729dc1e.gif) ![](RackMultipart20210225-4-1v6cbni_html_933a325e52307347.gif)

subcollections

The diagram shows how firestore scales horizontally.

![](RackMultipart20210225-4-1v6cbni_html_80bdd1e08a8ad0a7.jpg)

In the above figure the data present in the collection, document and field are shown. The numbers of collections are three which are:

- datasetSymptom: It contains symptoms as documents and its fields are list of disease that have these symptoms as common.
- DatasetDisease: It contains diseases as documents and its fields are list of symptoms of said disease.
- userSymptoms: It contains the auto generated id as document with doctor added symptom as fields. In every session new id is generated.

  1. **Flow Chart:**

![](RackMultipart20210225-4-1v6cbni_html_6d354d9c031d3695.jpg)

1. **Implementation of features:**

![](RackMultipart20210225-4-1v6cbni_html_1883eebfe868fdb8.jpg)

  1. **Connecting with firebase firestore:**
    - T ![](RackMultipart20210225-4-1v6cbni_html_5849a34ef51f1a97.png)
 o connect with firebase we have to copy the config details of the project and add it to a .js file and initialize it.

The last line of this code is done so that firebase app is initialized only once.

- The next is to use **const db=**** firebase.firestore()** to connect with firebase firestore.
- Next thing is to use **db.collection(&#39;name&#39;).document(&#39;name&#39;).get() or .set()** functions to get fetch or set our data

  1. **Add Symptoms:**

T ![](RackMultipart20210225-4-1v6cbni_html_9a5324125fff0860.png)
 o implement the Symptoms auto completion feature and bubble wrap the symptoms, we used react-native-tag-autocomplete package installed by using: $  **npm install --save react-native-tag-autocomplete.**

Implementation of AutoTags:

**Props used:**

- Suggestions: Array of suggestion objects.
- tagsSelected: Array of tags selected
- handleAddition: pushes symptoms to tags selected
- handledelete: deletes the symptom from tagsSelected
- placeholder: Text that would be in the text field defining it.

  1. **Props passed to Diagnosis:**

In our app we are navigation prop to move between screens. So we found a method to add the tagsSelected(Symptoms Added) into:

**this.props.navigation.navigate(&quot;Page&quot;,{stored:this.state.tagsSelected})**

The reason we did this so that we can pass the added symptoms to next page AutoTags component, where we can fetch it through: **this.props.route.params.stored.**

  1. **Tabbed View:**

To implement the tabbed view we used react-native-tab-view package which can be installed through:

$  **npm install --save**** react-native-tab-view.**

Implementation Of Tabbed View:

![](RackMultipart20210225-4-1v6cbni_html_a3c74d4c569cb0b7.png)

**Props used:**

- navigationState: State for the tab view. The state should contain the following properties:
  - index: a number representing the index of the active route in the routes array
  - routes: an array containing a list of route objects used for rendering the tabs

![](RackMultipart20210225-4-1v6cbni_html_ca3b655d6c5cc634.png)

- renderScene: Callback which returns a react element to render as the page for the tab. Receives an object containing the route as the argument:

![](RackMultipart20210225-4-1v6cbni_html_d3ae6ca5af5cb82b.jpg)

![](RackMultipart20210225-4-1v6cbni_html_c7b2c8e0528768ec.jpg)

- renderTabBar: Callback which returns a custom React Element to use as the tab bar.
- onIndexChange: Callback which is called on tab change, receives the index of the new tab as argument. The navigation state needs to be updated when it&#39;s called, otherwise the change is dropped.

  1. **Progress Circle:**

![](RackMultipart20210225-4-1v6cbni_html_5fc7511c99cce601.png)

Progress circle is custom package from npm js which can be installed through:

$  **npm install --save**** react-native-progress-circle.**

We used this component to show the the percentage of match of the disease with the symptoms added.

  1. **Modal Component:**

![](RackMultipart20210225-4-1v6cbni_html_787c313606293bef.png)

Modalcomponent is a basic way in react-native docs to present content above an enclosing view. Which we intent to do so that when the doctor clicks on disease box when the doctor taps a disease present then a popup should show complete symptoms of the disease, to show these symptoms we used FlatList as shown in the snippet.

**Props used:**

- animationType: shows how the modal animates. There are 3 options:
  - slides
  - fades
  - none
- transparent: whether your modal will fill the entire view.
- visible: whether the modal is visible or not
- onRequestClose:The onRequestClose callback is called when the user taps the hardware back button.

1. **Testing:**

Errors in design pattern on different screen sizes leads to bad user experience and ultimately, business losses. So the phase of testing before finalizing our app is important. To test our application we have distributed our app&#39;s .apk and .ipa to the circle of friends we are involved with. This way we can test the reactnative performance on android and ios and also optimize our design.

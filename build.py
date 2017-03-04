from os import listdir
from os.path import isfile, join
import os,glob
from random import randint

print("Generator start")

creator='Paul Boldijar'
email='boldijar.paul@gmail.com'
github='http://www.github.com/boldijarpaul'
facebook='http://www.facebook.com/bolnizar'
subtitle='Android developer'
shortDesc='I\'m working as an android programmer for almost 3 years. I love material design, building great apps.'
def getProjects():
    projects=[x[0] for x in os.walk('projects')]
    projects.pop(0)
    returnFolders=[]
    for folder in projects:
        returnFolders.append(folder.replace('projects\\',''))  
    return returnFolders

def getImagesInFolder(project):
    files= os.listdir("projects/"+project)
    returnImages=[]
    for file in files:
        if '.png' in file:
            returnImages.append(file)
    return returnImages

def readFile(path):
    path=os.path.abspath(path)
    with open(path) as myfile:
        return "".join(line.rstrip() for line in myfile)
    
def buildStringsHtml(images,imageSpan,project):
    value=''
    for image in images:
        value=value+imageSpan.replace('$imagePath','projects/'+project+'/'+image)+'\n'
    return value

def writeFile(name,content):
    f = open(name, 'w')
    f.write(content)  
    f.close()
    
imageSpan=readFile('project_image.txt')
generic=readFile('generic.html').replace('$creator',creator).replace('$github',github).replace('$email',email).replace('$facebook',facebook)
indexTemplate=readFile('index_template.html').replace('$creator',creator).replace('$github',github).replace('$email',email).replace('$facebook',facebook)
indexTemplate=indexTemplate.replace('$subtitle',subtitle).replace('$shortDesc',shortDesc)
homeImageSpan=readFile('home_image_html.txt')
# getting projects
projects=getProjects()
homeImages=''
for projectName in projects:
    photos=getImagesInFolder(projectName)
    appName=readFile('projects/'+projectName+'/name.txt')
    description=readFile('projects/'+projectName+'/description.txt')
    technologies=readFile('projects/'+projectName+'/technologies.txt')
    span=buildStringsHtml(photos,imageSpan,projectName)
    generated=generic.replace('$images',span)
    generated=generated.replace('$about',description).replace('$technologies',technologies).replace('$appname',appName)
    outputFile=appName+'.html'
    writeFile(outputFile,generated)
    homeImages=homeImages+homeImageSpan.replace('$styleNumber',str(randint(1,6))).replace('$image','projects/'+projectName+'/'+photos[0]).replace('$page',outputFile).replace('$appname',appName).replace('$technologies',technologies)
    print(outputFile+'.html')
    
writeFile('index.html',indexTemplate.replace('$images',homeImages))
print('Generated index file!')
